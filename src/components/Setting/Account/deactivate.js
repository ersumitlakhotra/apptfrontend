import { Button } from "antd";
import Heading from "../../../common/heading";
import { WarningFilled } from '@ant-design/icons';

const Deactivate = () => {
    return (
        <div class='w-full bg-white border rounded-lg p-4 flex flex-col gap-4 '>
            <Heading label={"Deactivate account"} desc={'Deactivate your account and all of your data will be deleted. This is irreversible.'} icon={<WarningFilled  style={{ color: 'red' }} />} />
            <div class='mx-6 mt-2 flex '>
                <Button color="danger" variant="outlined" size="large">Deactivate</Button>
            </div>
        </div>
    )
}
export default Deactivate;

