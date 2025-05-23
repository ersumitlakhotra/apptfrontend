import DashHeaderItems from "../../components/Dashboard/Header/headerItem"; 
import Cards from "../../components/Dashboard/Cards/cards";

const Dashboard=()=> {
    const dashHeaderItems=DashHeaderItems;
    return(
        <div>
            <div class='flex flex-col gap-3 md:flex-row '>
            {dashHeaderItems.map (items => (
                <Cards key={items.key} label={items.label} value={items.value} />
            ))}
            

            </div>
        </div>
    )
}

export default Dashboard;