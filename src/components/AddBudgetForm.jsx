import { CurrencyRupeeIcon } from "@heroicons/react/24/solid"
import { useEffect, useRef } from "react";
import {  useFetcher } from "react-router-dom"


const AddBudgetForm = () => {
  const fetcher =   useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();
  useEffect(()=>{
    
 if(fetcher.state === "idle"){
    formRef.current.reset()
    focusRef.current.focus()
 }
  }, [fetcher.state]) 

  return (
    <div className="form-wrapper">
        <h2 className="h3">Create Budget</h2>
        <fetcher.Form method="post" className="grid-sm" ref={formRef}>
            <div className="grid-xs">
                <label htmlFor="newBudget">Budget Name</label>
                <input type="text" name="newBudget" id="newBudget" placeholder="e.g., Groceries" required  ref={focusRef} />
            </div>
         <div className="grid-xs">
            <label htmlFor="newBudgetAmount">Amount</label>
            <input type="number" name= "newBudgetAmount" id="newBudgetAmount"
             required placeholder="e.g., 500" />
         </div>
         <input type="hidden"  name="_action" value="createBudget" />
         <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
            { isSubmitting ? <span>Submitting...</span> : (
                <>
                <span>Create Budget</span>
                <CurrencyRupeeIcon width={20} />  
                </>
            )}
         </button>
        </fetcher.Form>
      
    </div>
  )
}

export default AddBudgetForm
