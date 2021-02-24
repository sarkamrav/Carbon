import carbonactiontype from './actiontype';
const initial_state ={
   tabledata:[]
}
export const tabledata = (state =initial_state,action) =>{
    switch(action.type){
            case carbonactiontype.DELETE: 
            return{
            ...state ,
            collection:action.payload
            }
        
            default:
            return state;
        }
    };

