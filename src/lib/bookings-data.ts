export type Booking = {
    id: string;
    itemType: 'Hébergement' | 'Véhicule' | 'Circuit';
    itemId: string;
    itemName: string;
    customer: {
        name: string;
        email: string;
    };
    dates: string;
    totalAmount: number;
    status: 'Confirmé' | 'En attente de paiement' | 'Annulé';
};

export const bookings: Booking[] = [
    {
        id: 'ST2024-8451',
        itemType: 'Hébergement',
        itemId: '1',
        itemName: 'Hôtel El-Aurassi',
        customer: {
            name: 'Amina Belkacem',
            email: 'amina.b@email.com',
        },
        dates: '15/08/2024 - 18/08/2024',
        totalAmount: 66000,
        status: 'Confirmé',
    },
    {
        id: 'ST2024-7319',
        itemType: 'Véhicule',
        itemId: 'c2',
        itemName: 'Hyundai Tucson',
        customer: {
            name: 'Yanis Martin',
            email: 'yanis.martin@email.com',
        },
        dates: '20/08/2024 - 25/08/2024 (5 jours)',
        totalAmount: 60000,
        status: 'Confirmé',
    },
    {
        id: 'ST2024-6592',
        itemType: 'Circuit',
        itemId: 'circ1',
        itemName: "La Magie du Tassili n'Ajjer",
        customer: {
            name: 'Sophie Dubois',
            email: 'sophie.d@email.com',
        },
        dates: 'Départ le 10/10/2024 (2 pers.)',
        totalAmount: 170000,
        status: 'En attente de paiement',
    },
     {
        id: 'ST2024-5114',
        itemType: 'Hébergement',
        itemId: '3',
        itemName: 'Riad "Le Charme de la Casbah"',
        customer: {
            name: 'David Chen',
            email: 'david.chen@email.com',
        },
        dates: '01/09/2024 - 05/09/2024',
        totalAmount: 60000,
        status: 'Confirmé',
    },
    {
        id: 'ST2024-4823',
        itemType: 'Hébergement',
        itemId: '8',
        itemName: 'Villa "La Brise Marine"',
        customer: {
            name: 'Fatima Zohra',
            email: 'fatima.z@email.com',
        },
        dates: '12/07/2024 - 19/07/2024',
        totalAmount: 168000,
        status: 'Annulé',
    },
];
