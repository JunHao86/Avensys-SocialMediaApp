//npm install redux, npm install react-redux

const { createStore, combineReducers } = require("redux")

const userData =
{
    user:{}
}

//Action
export function storeUser(info){
    return{
        type:"STORE_USER_ONLY", 
        payload: info
    }
    
}

//REDUCER
const UserReducer = (state = userData, action)=>
{
    if(action.type ==="STORE_USER_ONLY")
    {
        console.log('Handling STORE_USER_ONLY action:', action);
        // if the condition is true, we need to add task that is assocaited
        //  with the payload key to redux store
        
        
        return{
            //update task key
                      
           post:{...action.payload}
        }

    }
    else
    {
        return state
    }
}

const postDataAdmin =
{
    post:{}
}

//Action
export function addPost_admin(info){
    return{
        type:"STORE_POST_ADMIN_ONLY", 
        payload: info
    }
    
}

//REDUCER
const Post_adminReducer = (state = postDataAdmin, action)=>
{
    if(action.type ==="STORE_POST_ADMIN_ONLY")
    {
        console.log('Handling STORE_POST_ADMIN_ONLY action:', action);
        // if the condition is true, we need to add task that is assocaited
        //  with the payload key to redux store
        
        
        return{
            //update task key
                      
           post:{...action.payload}
        }

    }
    else
    {
        return state
    }
}

const userDataAdmin =
{
    
    user:{}
}

//Action
export function addUsers_admin(info){
    return{
        type:"STORE_USERS_ADMIN_ONLY", 
        payload: info //payload: "Playing"
    }
    
}

//REDUCER
const User_adminReducer = (state = userDataAdmin, action)=>
{
    if(action.type ==="STORE_USERS_ADMIN_ONLY")
    {
        // if the condition is true, we need to add task that is assocaited
        //  with the payload key to redux store
        console.log('Handling STORE_USERS_ADMIN_ONLY action:', action);
        return{
            //update task key            
            user:{...action.payload}
        }

    }
    else
    {
        return state
    }
}

// COMBINED REDUCER
const rootReducer = combineReducers({
    Post_adminReducer:Post_adminReducer,
    User_adminReducer:User_adminReducer,
    UserReducer:UserReducer
})

//Redux Store
 export const socialAppStore = createStore(rootReducer)
