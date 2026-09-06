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
        type: 'text',
        name: 'description',
        label: 'Description',
        minLength: 100,
        maxLength: 600,
        placeholder: 'Your Description'
    },
    {
        id: 3,
        type: 'number',
        name: 'price',
        label:'Price',
        minLength: 2,
        maxLength: 200,
        placeholder: 'Price'
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