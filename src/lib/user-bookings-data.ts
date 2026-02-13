export type UserBooking = {
    id: string;
    itemType: 'Hébergement' | 'Véhicule' | 'Circuit';
    itemId: string;
    itemName: string;
    startDate: string; // ISO string
    endDate: string; // ISO string
    totalAmount: number;
    status: 'Confirmé' | 'Annulé';
};

const now = new Date();

export const userBookings: UserBooking[] = [
    {
        id: 'ST2024-8451',
        itemType: 'Hébergement',
        itemId: '1',
        itemName: 'Hôtel El-Aurassi',
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10).toISOString(),
        endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 13).toISOString(),
        totalAmount: 66000,
        status: 'Confirmé',
    },
    {
        id: 'ST2024-7319',
        itemType: 'Véhicule',
        itemId: 'c2',
        itemName: 'Hyundai Tucson',
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 20).toISOString(),
        endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 25).toISOString(),
        totalAmount: 60000,
        status: 'Confirmé',
    },
    {
        id: 'ST2024-4001',
        itemType: 'Hébergement',
        itemId: '2',
        itemName: 'Royal Hôtel Oran - MGallery',
        startDate: new Date(now.getFullYear(), now.getMonth() + 1, 5).toISOString(),
        endDate: new Date(now.getFullYear(), now.getMonth() + 1, 10).toISOString(),
        totalAmount: 140000,
        status: 'Confirmé',
    },
     {
        id: 'ST2024-1122',
        itemType: 'Hébergement',
        itemId: '2',
        itemName: 'Royal Hôtel Oran - MGallery',
        startDate: new Date(now.getFullYear(), now.getMonth() - 2, 1).toISOString(),
        endDate: new Date(now.getFullYear(), now.getMonth() - 2, 3).toISOString(),
        totalAmount: 56000,
        status: 'Confirmé',
    },
    {
        id: 'ST2024-5114',
        itemType: 'Hébergement',
        itemId: '3',
        itemName: 'Riad "Le Charme de la Casbah"',
        startDate: new Date(now.getFullYear(), now.getMonth() - 1, 15).toISOString(),
        endDate: new Date(now.getFullYear(), now.getMonth() - 1, 19).toISOString(),
        totalAmount: 60000,
        status: 'Confirmé',
    },
    {
        id: 'ST2024-4823',
        itemType: 'Hébergement',
        itemId: '8',
        itemName: 'Villa "La Brise Marine"',
        startDate: new Date(now.getFullYear(), now.getMonth() - 3, 12).toISOString(),
        endDate: new Date(now.getFullYear(), now.getMonth() - 3, 19).toISOString(),
        totalAmount: 168000,
        status: 'Annulé',
    },
];
