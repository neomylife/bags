


import {deleteAsync}   from  'del';



const clean = () => {
    return deleteAsync('./public/')
   
};

export default clean; 