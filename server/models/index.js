import 

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://tomas:password123$$@cluster0.tcni6.mongodb.net/Cluster0?retryWrites=true&w=majority',
{
    useNewUrlParser: true,

}
,
connectionResponse => {
    const response = connectionResponse ?  'Connection Succeded' : 'Connection Error'
    console.log(response)
}
)

