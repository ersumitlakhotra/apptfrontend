
import { Switch } from "antd"; 
import { TextboxFlex } from "../../common/textbox";

const UserLoginPermissions = ({ dashboard, setDashboard, tasks, setTasks, order, setOrder, event, setEvent, payment, setPayment, customer, setCustomer ,services ,setServices ,  
    users, setUsers, schedule,setSchedule,sales ,setSales , collection, setCollection,setting ,setSetting  }) => {
    const Checked = 'On'; const Unchecked = 'Off';
    return (
        <div class='flex flex-col font-normal gap-2 mt-2'>


            <TextboxFlex label={'Appointment'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={order} onChange={(e) => setOrder(e)} />
            } />

          {false && <TextboxFlex label={'Dashboard'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={dashboard}  onChange={(e) => setDashboard(e)}/>
            } /> }

            <TextboxFlex label={'Calender'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={tasks} onChange={(e) => setTasks(e)}  />
            } />

            <TextboxFlex label={'Event'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={event} onChange={(e) => setEvent(e)} />
            } />

            {false && <TextboxFlex label={'Payment'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={payment} onChange={(e) => setPayment(e)} />
            } />}

            <TextboxFlex label={'Customer'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={customer} onChange={(e) => setCustomer(e)} />
            } />
            <TextboxFlex label={'Services'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={services} onChange={(e) => setServices(e)} />
            } />

            <TextboxFlex label={'Users'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={users} onChange={(e) => setUsers(e)} />
            } />
            <TextboxFlex label={'Schedule'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={schedule} onChange={(e) => setSchedule(e)} />
            } />

            {false && <TextboxFlex label={'Sales'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={sales} onChange={(e) => setSales(e)} />
            } />}

            {false && <TextboxFlex label={'Collection'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={collection} onChange={(e) => setCollection(e)} />
            } /> }
            <TextboxFlex label={'Setting'} input={
                <Switch checkedChildren={Checked} unCheckedChildren={Unchecked} defaultChecked={setting} onChange={(e) => setSetting(e)} />
            } />

        </div>
    )
}

export default UserLoginPermissions;