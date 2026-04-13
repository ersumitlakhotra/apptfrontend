import { TextboxFlex } from "../../common/textbox";
import { BsCash } from "react-icons/bs";
import { TbTransfer } from "react-icons/tb";
import { Flex, Input, Radio, Select } from "antd";
import { CreditCardOutlined } from '@ant-design/icons';
import { setNumberAndDot } from "../../common/cellformat";
import { useEffect, useState } from "react";
import RewardCard from "./rewardcard";
import { FaDivide } from "react-icons/fa6";

const ReceivePayment = ({ 
    mode, setMode, 
    received,  tip, setTip,  total, setReceived ,
     redeem,setRedeem,mode1,setMode1,mode2,setMode2,payment1,setPayment1,payment2,setPayment2, isTotalVisible= true,
      isLoyaltyActive,loyaltyRedeem,customerPoints
}) => {
    const modes = [
        {value:'Cash', label:'Cash', icon:<BsCash style={{ fontSize: 16 }} />},
        {value:'Interac', label:'E-Transfer', icon:<TbTransfer style={{ fontSize: 16 }} />},
        {value:'Card', label:'By Card', icon:<CreditCardOutlined style={{ fontSize: 16 }} />},
        {value:'Partial', label:'Partial', icon:<FaDivide style={{ fontSize: 16 }} />}
    ]

    useEffect(() => {
        if (parseFloat(received).toFixed(2) > 0)
            calculateTip(received)
    }, [total])   
    
    useEffect(() => {
        const receivePayment=(parseFloat(payment1) + parseFloat(payment2)+ parseFloat(redeem)).toFixed(2);
       calculateTip(receivePayment)
    }, [payment1,payment2,redeem]) 

    const calculateTip = (value) => {
        let _value = setNumberAndDot(value) // _tax > 0 ? parseFloat((_subTotal * _tax) + _subTotal).toFixed(2) : _subTotal;
        setReceived(_value);
        let tip = parseFloat(_value).toFixed(2) - parseFloat(total).toFixed(2);
        if (tip > 0)
            setTip(parseFloat(tip).toFixed(2));
        else
            setTip(0);
    }


    const onModeChange = (value) => {
        setMode(value);

        if (value !== "Partial") {
            setMode1(value);
            setMode2(value);
            setPayment2(0);
        }

    }
    return (
        <div class='flex flex-col font-normal gap-3 '>
            <p class="text-gray-400 ">Payment Detail </p>
            <TextboxFlex label={'Type'} input={
                <Radio.Group onChange={(e) => onModeChange(e.target.value)} value={mode} style={{ width: '100%' }}>
                    {modes.map(item => (
                        <Radio.Button value={item.value}>
                            <Flex gap="small" justify="center" align="center"  >
                                {item.icon}
                                {item.label}
                            </Flex>
                        </Radio.Button>
                    ))}          
                </Radio.Group>
            } />    

           {isTotalVisible && <TextboxFlex label={'Total'} input={
                <Input placeholder="Total" style={{ backgroundColor: '#FAFAFA', fontSize: 16 }} status={parseFloat(total).toFixed(2) < 0 ? 'error' : ''} readOnly={true} value={total} />
            } />
        }

            <TextboxFlex label={'Payment'} mandatory={true} input={
                <div className="flex flex-row items-start gap-2 w-full">
                    {mode === 'Partial' &&  <Select
                        value={mode1}
                        style={{ width: 200, fontSize: 16 }}
                        onChange={(e) => setMode1(e)}
                        options={modes.filter(mod => mod.value !== "Partial").map((item) => ({
                            value: item.value,
                            label: (
                                <div className="flex items-center gap-2">
                                    {item.icon}
                                    {item.label}
                                </div>
                            ),
                        }))}
                    />}
                    <Input placeholder="Payment" style={{ fontSize: 16 }} value={payment1} status={payment1 === '' ? 'error' : ''}
                        onChange={(e) => setPayment1(e.target.value)} />
                </div>
            } />
            {mode === 'Partial' && <TextboxFlex label={'Payment'} mandatory={true} input={
                <div className="flex flex-row items-start gap-2 w-full">
                    <Select
                        value={mode2}
                        style={{ width: 200, fontSize: 16 }}
                        onChange={(e) => setMode2(e)}
                        options={modes.filter(mod => mod.value !== "Partial").map((item) => ({
                            value: item.value,
                            label: (
                                <div className="flex items-center gap-2">
                                    {item.icon}
                                    {item.label}
                                </div>
                            ),
                        }))}
                    />
                    <Input placeholder="Payment"   style={{ fontSize: 16 }} value={payment2} status={payment2 === '' ? 'error' : ''}
                        onChange={(e) => setPayment2(e.target.value)} />
                </div>
            } />
        }

            <TextboxFlex label={'Tip'} input={
                <Input placeholder="Total" style={{ backgroundColor: '#FAFAFA', fontSize: 16 }} readOnly={true} value={tip} />
            } />

            {isLoyaltyActive && <TextboxFlex label={' '} input={<RewardCard totalPoints={customerPoints} redeemPoints={loyaltyRedeem} redeem={redeem} setRedeem={setRedeem}/> } />}
           
        </div>
    )
}

export default ReceivePayment;