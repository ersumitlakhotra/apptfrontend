import { Button,  Switch, ConfigProvider, Checkbox, Input } from "antd";
import Heading from "../../../common/heading";
import { DollarCircleFilled } from '@ant-design/icons';
import { useEffect, useImperativeHandle, useState } from "react";
import { setNumberAndDot } from "../../../common/cellformat";
import StarBadge from "../../../common/starbadge.js";
import useAlert from "../../../common/alert.js";

const Loyalty = ({ loyaltyList, saveData,popUp=false,refNext=null }) => {
    const { contextHolder, warning } = useAlert();
    const [id, setId] = useState(0)
    const [isLoyalty, setIsLoyalty] = useState(false);

    const [isPointBased, setIsPointBased] = useState(false);
    const [pointBasedRewards, setPointBasedRewards] = useState(10);

    const [isPunch, setIsPunch] = useState(false);
    const [punchComplete, setPunchComplete] = useState(10);
    const [punchRewards, setPunchRewards] = useState(2500);

    const [isReferral, setIsReferral] = useState(false);
    const [referralRewards, setReferralRewards] = useState(2500);


    const [isTier, setIsTier] = useState(false);
    const [bronzeAppointment, setBronzeAppointment] = useState(10);
    const [bronzeReward, setBronzeReward] = useState(2500);
    const [silverAppointment, setSilverAppointment] = useState(20);
    const [silverReward, setSilverReward] = useState(2500);
    const [goldAppointment, setGoldAppointment] = useState(30);
    const [goldReward, setGoldReward] = useState(2500);
    const [platinumAppointment, setPlatinumAppointment] = useState(40);
    const [platinumReward, setPlatinumReward] = useState(2500);

    const [redeem, setredeem] = useState(100);


    const headingLabel = 'Loyalty Program';

    useEffect(() => {
        if (loyaltyList.length === 0) {
            setIsLoyalty(false);
            setId(0);
            setIsPointBased(false);
            setPointBasedRewards(10);

            setIsPunch(false);
            setPunchComplete(10);
            setPunchRewards(2500);

            setIsReferral(false);
            setReferralRewards(2500);

            setIsTier(false);
            setBronzeAppointment(5);
            setBronzeReward(2500);
            setSilverAppointment(5);
            setSilverReward(2500);
            setGoldAppointment(5);
            setGoldReward(2500);
            setPlatinumAppointment(5);
            setPlatinumReward(2500);
            setredeem(100)
        }
        else {

            loyaltyList.map(editList => {
                setId(editList.id);
                setIsLoyalty(editList.active);

                setIsPointBased(editList.ispoint);
                setPointBasedRewards(editList.pointreward);

                setIsPunch(editList.ispunch);
                setPunchComplete(editList.punchcomplete);
                setPunchRewards(editList.punchreward);

                setIsReferral(editList.isreferral);
                setReferralRewards(editList.referralreward);


                setIsTier(editList.istier);
                setBronzeAppointment(editList.bronzetier);
                setBronzeReward(editList.bronzereward);
                setSilverAppointment(editList.silvertier);
                setSilverReward(editList.silverreward);
                setGoldAppointment(editList.goldtier);
                setGoldReward(editList.goldreward);
                setPlatinumAppointment(editList.platinumtier);
                setPlatinumReward(editList.platinumreward);
                setredeem(editList.redeem)
            })

        }
    }, [loyaltyList])

    const isValidNumber = (value) => {
        return value !== null && value !== "" && Number(value) >= 1;
    };

    const isFormValid = () => {
        if (isPointBased && !isValidNumber(pointBasedRewards)) return false;

        if (isPunch) {
            if (!isValidNumber(punchComplete)) return false;
            if (!isValidNumber(punchRewards)) return false;
        }

        if (isReferral && !isValidNumber(referralRewards)) return false;

        if (isTier) {
            if (!isValidNumber(bronzeAppointment) || !isValidNumber(bronzeReward)) return false;
            if (!isValidNumber(silverAppointment) || !isValidNumber(silverReward)) return false;
            if (!isValidNumber(goldAppointment) || !isValidNumber(goldReward)) return false;
            if (!isValidNumber(platinumAppointment) || !isValidNumber(platinumReward)) return false;
        }

        if (isLoyalty && !isValidNumber(redeem)) return false;
        return true;
    };


    const save = async () => {
        let isSave = false;

        if (!isLoyalty)
            isSave = true
        else if (isLoyalty && (isPointBased || isPunch || isReferral || isTier) && isFormValid())
            isSave = true
 console.log('fyhjhkjk'+isSave)
        if (isSave) {
            const Body = JSON.stringify({
                active: isLoyalty,
                ispoint: isPointBased,
                pointreward: pointBasedRewards,
                ispunch: isPunch,
                punchcomplete: punchComplete,
                punchreward: punchRewards,
                isreferral: isReferral,
                referralreward: referralRewards,
                istier: isTier,
                bronzetier: bronzeAppointment,
                bronzereward: bronzeReward,
                silvertier: silverAppointment,
                silverreward: silverReward,
                goldtier: goldAppointment,
                goldreward: goldReward,
                platinumtier: platinumAppointment,
                platinumreward: platinumReward,
                redeem: redeem
            });
            saveData({
                label: headingLabel,
                method: id !== 0 ? 'PUT' : 'POST',
                endPoint: "loyalty",
                id: id !== 0 ? id : null,
                body: Body,
                notify: !popUp

            });
           
            return true;
        }
        else {
            if (isLoyalty && !isPointBased && !isPunch && !isReferral && !isTier)
                warning('Select atleast one option !')
            else
                warning('Please, fill out the required fields !')

             return false;
        }
        
    }

    useImperativeHandle(refNext, () => ({
        handleSave: save
    }));
          
        

    const CheckBox = ({ label, isChecked, setIsChecked }) => {
        return (<ConfigProvider
            theme={{
                components: {
                    Checkbox: {
                        colorPrimary: "#f97316",
                        colorBorder: "#9ca3af",
                    },
                },
            }}
        >
            <Checkbox className={`${isChecked ? 'text-orange-500' : 'text-gray-400'} font-bold`} checked={isChecked} onChange={() => setIsChecked(!isChecked)}>
                {label}
            </Checkbox>
        </ConfigProvider>
        )
    }

    const TierRow = ({ label, appointment, setAppointment, reward, setReward }) => {
        return (
            <p class='font-medium text-gray-500 text-xs flex gap-2 items-center ml-6 mt-2'>
                <StarBadge name={label} size="xs" />
                <span className="w-28">{label} badge at</span>
                <Input style={{ width: 60 }} size="small" placeholder="0" value={appointment} onChange={(e) => setAppointment(setNumberAndDot(e.target.value))} />
                appointments,  get
                <Input style={{ width: 60 }} size="small" placeholder="0" value={reward} onChange={(e) => setReward(setNumberAndDot(e.target.value))} />
                points.
            </p>
        );
    };
    return (
        <div class={`w-full bg-white ${popUp ? '' :'border'} rounded-lg p-4 flex flex-col gap-4 `}>
            <Heading label={headingLabel} Icon={<DollarCircleFilled  size={26}/>} desc={`To encourages them to continue choosing the same business by offering rewards over time`} />
           
            <div class=" flex flex-col gap-2 mt-2 ps-8">
                <div class='flex gap-3 '>
                    <span class="block text-sm font-medium">What would you like to do?  Would you like to activate that loyalty program?</span>
                    <Switch style={{ width: '50px', fontSize: 16 }} checkedChildren={'On'} unCheckedChildren={'Off'} value={isLoyalty} onChange={(e) => setIsLoyalty(e)} />
                </div>
                {isLoyalty && <>    
                    <p class=' text-gray-500 text-xs font-semibold flex gap-2 items-center mb-3'>
                        Redeem
                        <Input style={{ width: 60 }} size="small" placeholder="0" value={redeem} onChange={(e) => setredeem(setNumberAndDot(e.target.value))} />
                        points = $1 reward
                    </p>
                    <div class='flex flex-col gap-0'>
                        <CheckBox label={"Points-Based Program"} isChecked={isPointBased} setIsChecked={setIsPointBased} />
                        <p class='text-gray-400 text-xs font-normal ml-6'>Customers earn points for each purchase and redeem them later (e.g., spend $1 = 10 points)</p>
                        {isPointBased && <p class='font-medium text-gray-500 text-xs flex gap-2 items-center ml-6 mt-2'>
                            Spend $1 , get
                            <Input style={{ width: 60 }} size="small" placeholder="0" value={pointBasedRewards} onChange={(e) => setPointBasedRewards(setNumberAndDot(e.target.value))} />
                            points.
                        </p>
                        }
                    </div>
                    <div class='flex flex-col mt-2 gap-0'>
                        <CheckBox label={"Punch Card Program"} isChecked={isPunch} setIsChecked={setIsPunch} />
                        <p class='text-gray-400 text-xs font-normal ml-6'>This scheme entails receiving rewards for fulfilling particular appointments.</p>
                        {isPunch && <p class='font-medium text-gray-500 text-xs flex gap-2 items-center ml-6 mt-2'>
                            Complete
                            <Input style={{ width: 60 }} size="small" placeholder="0" value={punchComplete} onChange={(e) => setPunchComplete(setNumberAndDot(e.target.value))} />
                            appointments,  get
                            <Input style={{ width: 60 }} size="small" placeholder="0" value={punchRewards} onChange={(e) => setPunchRewards(setNumberAndDot(e.target.value))} />
                            points.
                        </p>
                        }
                    </div>
                    <div class='flex flex-col gap-0'>
                        <CheckBox label={"Referral Program"} isChecked={isReferral} setIsChecked={setIsReferral} />
                        <p class='text-gray-400 text-xs font-normal ml-6'>Customers get benefits for bringing in new customers.</p>
                        {isReferral && <p class='font-medium text-gray-500 text-xs flex gap-2 items-center ml-6 mt-2'>
                            Bring 1 referral client, get
                            <Input style={{ width: 60 }} size="small" placeholder="0" value={referralRewards} onChange={(e) => setReferralRewards(setNumberAndDot(e.target.value))} />
                            points.
                        </p>
                        }
                    </div>
                    <div class='flex flex-col gap-0'>
                        <CheckBox label={"Tier-Based Program"} isChecked={isTier} setIsChecked={setIsTier} />
                        <p class='text-gray-400 text-xs font-normal ml-6'>Customers will be rewarded if you reach that level.</p>
                        {isTier && <>
                            <TierRow label={"Bronze"} appointment={bronzeAppointment} setAppointment={setBronzeAppointment} reward={bronzeReward} setReward={setBronzeReward} />
                            <TierRow label={"Silver"} appointment={silverAppointment} setAppointment={setSilverAppointment} reward={silverReward} setReward={setSilverReward} />
                            <TierRow label={"Gold"} appointment={goldAppointment} setAppointment={setGoldAppointment} reward={goldReward} setReward={setGoldReward} />
                            <TierRow label={"Platinum"} appointment={platinumAppointment} setAppointment={setPlatinumAppointment} reward={platinumReward} setReward={setPlatinumReward} />
                        </>
                        }
                    </div>
                    <div class='flex flex-col  gap-0'>
                     
                    </div>
                  
                </>}

            </div>
            <div class='mx-6 flex justify-end '>
                {!popUp && <Button size='large' color="primary" variant="solid" onClick={save} >Save changes</Button>}
            </div>
{contextHolder}
        </div>
    )
}
export default Loyalty;

