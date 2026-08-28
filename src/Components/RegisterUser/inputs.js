const inputs = [
    {
        id:1,
        type:'text',
        name:'name',
        label:'Name',
        minLenght:5,
        maxLenght:400,
        placeholder:'Example: John Marston '
    },
    {
        id:2,
        type:'email',
        label:'Email',
        name:'email',
        minLenght:5,
        maxLenght:400,
        placeholder:'Example: JohnMarston@gmail.com '
    },
    {
        id:3,
        type:'number',
        name:'cpf',
        label:'Cpf',
        minLenght:3,
        maxLenght:14,
        placeholder:'Example: 12345678901234 '
    },
    {
        id:4,
        type:'password',
        label:'Password',
        name:'password',
        minLenght:5,
        maxLenght:100,
        placeholder:'Example: Jo1hnMar@ston14314_ '
    },
]
export default inputs