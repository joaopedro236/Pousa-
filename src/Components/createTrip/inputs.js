const inputs = [
    {
        id: 1,
        type: 'text',
        name: 'name',
        label: 'Trip Name',
        minLength: 3,
        maxLength: 100,
        placeholder: 'Example: Vacation in Rio'
    },
    {
        id: 2,
        type: 'number',
        name: 'price',
        label:'Price',
        minLength: 2,
        maxLength: 200,
        placeholder: 'Price'
    },
    {
        id: 3,
        type: 'text',
        name: 'destination',
        label: 'Destination',
        minLength: 2,
        maxLength: 200,
        placeholder: 'Example: Rio de Janeiro'
    },
    {
        id: 4,
        type: 'date',
        name: 'startDate',
        label: 'Start Date'

    },
    {
        id: 5,
        type: 'date',
        name: 'endDate',
        label: 'End Date'
    },
    {
        id: 6,
        type: 'number',
        name: 'numbertravelers',
        label: 'Number of Travelers',
        minLength: 1,
        maxLength: 50,
        placeholder: 'Example: 2'
    }
]

export default inputs