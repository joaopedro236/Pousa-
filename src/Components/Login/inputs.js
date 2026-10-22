const inputs = [
    {
        id:1,
        type:'email',
        name:'email',
        label:'Your Email',
        minLenght:5,
        maxLenght:400,
        placeholder:'Example: JohnMarston@gmail.com '
    }, {
        id:2,
        type:'number',
        name:'cpf',
        label:'Your TIN',
        minLenght:3,
        maxLenght:14,
        placeholder:'Example: 12345678901234 '
    },{
        id:3, 
        type:"password",
        name:"password",
        minLenght:5,
        maxLenght:100,
        placeholder:"Your password",
        label:"Password"
    }
]
export default inputs