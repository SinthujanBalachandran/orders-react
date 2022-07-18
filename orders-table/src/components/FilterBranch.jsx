import { useState } from "react"

export default function FilterBranch(props){

    const [selection, setSelection] = useState()

    const uniqueBranch = [...new Set(props.branch.map(branch=> [branch.branch]))]


    const branchName =  uniqueBranch.map(branch => {

     return <option  key={branch.id} value={branch}>{branch}</option>
        
})




    return(
        <>
        <label >Filter by branch</label> <br />
        <select onChange={(e)=>setSelection(e.target.value)} name="branch" id="branch">
        <option value="All">All</option> 
            {branchName}
        </select>
        </>
    )
}