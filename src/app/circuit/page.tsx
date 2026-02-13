"use client";

import { notFound, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { circuits as initialCircuits, pendingCircuits as initialPendingCircuits } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, CheckCircle, CalendarIcon, Info } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCurrency } from '@/context/currency-context';
import { Checkbox } from '@/components/ui/checkbox';
import { sendBookingConfirmationEmail } from '@/lib/mail';
import { SiPaypal } from "@icons-pack/react-simple-icons";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { DateRange } from "react-day-picker";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const bookingSchema = z.object({
    fullName: z.string().min(2, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    phone: z.string().min(10, "Téléphone invalide"),
    adults: z.number().min(1, "Minimum 1 adulte"),
    children: z.number().min(0),
    infants: z.number().min(0),
    paymentMethod: z.string().min(1, "Méthode requise"),
    agreeToTerms: z.boolean().refine(val => val === true, "Obligatoire"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

function CircuitBookingForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const { formatPrice } = useCurrency();
    
    const [circuit, setCircuit] = useState<any>(null);
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const [reservationDetails, setReservationDetails] = useState({ number: '', email: '' });
    const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
    const [dates, setDates] = useState<DateRange | undefined>(() => {
        const from = searchParams.get('from');
        const to = searchParams.get('to');
        return (from && to) ? { from: new Date(from), to: new Date(to) } : undefined;
    });

    useEffect(() => {
        const id = searchParams.get('id');
        if (!id) return;
        
        try {
            const approvedData = JSON.parse(localStorage.getItem('approvedCircuits') || '[]');
            const storedPending = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
            const all = [...initialCircuits, ...approvedData, ...initialPendingCircuits, ...storedPending];
            const found = all.find(p => String(p.id) === String(id));
            
            if (found) setCircuit(found);
            else notFound();
        } catch (e) {
            console.error("Erreur de chargement local:", e);
        }
    }, [searchParams]);

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            adults: Number(searchParams.get('adults')) || 1,
            children: Number(searchParams.get('children')) || 0,
            infants: Number(searchParams.get('infants')) || 0,
            paymentMethod: 'card',
            agreeToTerms: false,
        },
    });

    if (!circuit) return <div className="p-20 text-center">Chargement du circuit...</div>;

    const { paymentMethod } = form.watch();
    const adults = form.watch('adults');
    const children = form.watch('children');
    const totalPaying = (Number(adults) || 0) + (Number(children) || 0);
    const totalPrice = (Number(circuit.pricePerPerson) || 0) * totalPaying;
    const deposit = totalPrice * 0.20;

    const onSubmit = async (values: BookingFormValues) => {
        const resNum = `ST-CIRCUIT-${Math.floor(1000 + Math.random() * 8999)}`;
        setReservationDetails({ number: resNum, email: values.email });
        
        try {
            await sendBookingConfirmationEmail({
                customerName: values.fullName,
                customerEmail: values.email,
                reservationNumber: resNum,
                itemName: circuit.title,
                itemType: 'circuit',
                hostName: circuit.guide?.name || "Guide Stayfloow",
                hostEmail: circuit.guide?.email || "contact@stayfloow.com",
                hostPhone: circuit.guide?.phone || "+212 000 000 000",
                bookingDetails: { 
                    startDate: dates?.from?.toISOString() || new Date().toISOString(), 
                    endDate: dates?.to?.toISOString(),
                    participants: totalPaying 
                }
            });
        } catch (e) { 
            console.error("Erreur d'envoi d'email:", e); 
        }

        setIsBookingConfirmed(true);
        toast({ title: "Réservation confirmée !" });
    };

    if (isBookingConfirmed) {
        return (
            <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4">Réservation terminée !</h1>
                <p className="text-muted-foreground mb-8">N° {reservationDetails.number}. Un e-mail a été envoyé à {reservationDetails.email}.</p>
                <Link href="/"><Button type="button">Retour à l'accueil</Button></Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <Button type="button" onClick={() => router.back()} className="mb-6 bg-slate-100 text-black hover:bg-slate-200">
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <Card>
                                <CardHeader><CardTitle>Informations Voyageurs</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField control={form.control} name="fullName" render={({ field }) => (
                                        <FormItem><FormLabel>Nom complet</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                        <FormField control={form.control} name="phone" render={({ field }) => (
                                            <FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Dates</Label>
                                        <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
                                            <PopoverTrigger asChild>
                                                <Button type="button" className="w-full justify-start font-normal border border-slate-200 bg-white text-black hover:bg-slate-50">
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {dates?.from ? (dates.to ? `${format(dates.from, "dd/MM/yy")} - ${format(dates.to, "dd/MM/yy")}` : format(dates.from, "dd/MM/yy")) : "Sélectionner les dates"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="range" selected={dates} onSelect={setDates} locale={fr} disabled={{ before: new Date() }} />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader><CardTitle>Paiement Acompte</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <Alert className="bg-blue-50 border-blue-200">
                                        <Info className="h-4 w-4 text-blue-600" />
                                        <AlertTitle>Acompte de 20%</AlertTitle>
                                        <AlertDescription>Le solde restant sera à régler directement auprès du guide.</AlertDescription>
                                    </Alert>
                                    
                                    <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                                            <div>
                                                <RadioGroupItem value="card" id="card" className="peer sr-only" />
                                                <Label htmlFor="card" className="flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 hover:bg-slate-50">
                                                    <CreditCard className="mb-2" /> Carte
                                                </Label>
                                            </div>
                                            <div>
                                                <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                                                <Label htmlFor="paypal" className="flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 hover:bg-slate-50">
                                                    <SiPaypal className="mb-2" /> PayPal
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    )}/>
                                </CardContent>
                            </Card>

                            <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                                <FormItem className="flex items-start space-x-3 p-4 border rounded-lg">
                                    <FormControl>
                                        <Checkbox checked={field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <Label className="text-sm cursor-pointer leading-none">
                                        J'accepte les conditions générales de vente et la politique de confidentialité.
                                    </Label>
                                    <FormMessage />
                                </FormItem>
                            )}/>

                            <Button type="submit" className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700">
                                Payer l'acompte : {formatPrice(deposit)}
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="lg:col-span-1">
                    <Card className="sticky top-24 shadow-lg border-none bg-slate-50">
                        <div className="relative h-48 w-full">
                            {circuit.images?.[0] ? (
                                <Image src={circuit.images[0]} alt={circuit.title} fill className="object-cover rounded-t-xl" />
                            ) : (
                                <div className="w-full h-full bg-slate-200 flex items-center justify-center rounded-t-xl">Image non disponible</div>
                            )}
                        </div>
                        <CardHeader><CardTitle className="text-xl">{circuit.title}</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Nombre de voyageurs</span>
                                <span className="font-bold text-black">{totalPaying}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium">
                                <span>Prix total</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-blue-600">
                                <span>Acompte (20%)</span>
                                <span>{formatPrice(deposit)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function CircuitBookingPage() {
    return (
        <Suspense fallback={<div className="p-20 text-center">Chargement de la page de réservation...</div>}>
            <CircuitBookingForm />
        </Suspense>
    );
}
