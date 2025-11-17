
import { Switch } from "antd"; 
import { TextboxFlex } from "../../common/textbox";

const UserLoginPermissions = ({ dashboard, setDashboard, tasks, setTasks, order, setOrder, event, setEvent, payment, setPayment, customer, setCustomer ,services ,setServices ,  
            users ,setUsers ,sales ,setSales ,setting ,setSetting  }) => {
    const Checked = 'Allowed'; const Unchecked = 'Blocked';
    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>

            <p class="text-gray-400">Overview</p>
           {/*<TextboxFlex label={'Dashboard'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={dashboard}  disabled onChange={(e) => setDashboard(e)}/>
            } />*/} 

            <TextboxFlex label={'Tasks'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={tasks} onChange={(e) => setTasks(e)}  />
            } />

            <TextboxFlex label={'Order'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={order} onChange={(e) => setOrder(e)} />
            } />

            <TextboxFlex label={'Event'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={event} onChange={(e) => setEvent(e)} />
            } />

            <TextboxFlex label={'Payment'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={payment} onChange={(e) => setPayment(e)} />
            } />

            <p class="text-gray-400 mt-4">Management</p>
            <TextboxFlex label={'Customer'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={customer} onChange={(e) => setCustomer(e)} />
            } />
            <TextboxFlex label={'Services'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={services} onChange={(e) => setServices(e)} />
            } />

            <TextboxFlex label={'Users'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={users} onChange={(e) => setUsers(e)} />
            } />

            <p class="text-gray-400 mt-4">Report</p>
            <TextboxFlex label={'Sales'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={sales} onChange={(e) => setSales(e)} />
            } />
            <p class="text-gray-400 mt-4">Misc</p>
            <TextboxFlex label={'Setting'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={setting} onChange={(e) => setSetting(e)} />
            } />

        </div>
    )
}

export default UserLoginPermissions;