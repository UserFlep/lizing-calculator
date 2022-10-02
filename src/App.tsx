import React, {ChangeEvent, ReactNode, useEffect, useState} from 'react';
import classes from './app.module.css';
import MySuperInput from "./components/MySuperInput/MySuperInput";
import MyButton from "./UI/MyButton/MyButton";
import MyResult from "./components/MyResult/MyResult";
import MySpinner from "./UI/MySpinner/MySpinner";
import axios from "axios";

interface ISuperInput {
    name: string,
    title: string,
    placeholder: string,
    min: number,
    max: number,
    initial: number,
    step: number,
    tab: string | ReactNode,
}

interface IData {
    price: ISuperInput,
    initialPercent: ISuperInput,
    months: ISuperInput,
}

const data:IData = {
    price: {
        name: "auto-price",
        title: "Стоимость автомобиля",
        placeholder: "2 500 000",
        min: 1000000,
        max: 6000000,
        initial: 3300000,
        step: 10000,
        tab: <span>&#8381;</span>
    },
    initialPercent: {
        name: "initial-fee",
        title: "Первоначальный взнос",
        placeholder: "200 000",
        min: 10,
        max: 60,
        initial: 13,
        step: 1,
        tab: "%",
    },
    months: {
        name: "leasing-term",
        title: "Срок лизинга",
        placeholder: "24",
        min: 1,
        max: 60,
        initial: 60,
        step: 1,
        tab: "мес.",
    },
}

function App() {
    const [price, setPrice] = useState<number>(data.price.initial);
    const [initialPercent, setInitialPercent] = useState<number>(data.initialPercent.initial);
    const [initial, setInitial] = useState<number>(initialPercent*price/100);
    const [months, setMonths] = useState<number>(data.months.initial);
    const [monthPay, setMonthPay] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    useEffect(()=>{
        const pay = Math.trunc((price - initial) * ((0.035 * Math.pow((1 + 0.035), months)) / (Math.pow((1 + 0.035), months) - 1)));
        setMonthPay(pay)
        setAmount(initial + months * pay)
    },[price, initial, months])

    const priceChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        if(!Number(e.target.value)){
            return
        }
        let newPrice = Number(e.target.value.replace(/\D/g, ''));
        if(newPrice > data.price.max) {
            newPrice = data.price.max
            setPrice(newPrice)
        }
        else if (newPrice < data.price.min) {
            newPrice = data.price.min
            setPrice(newPrice)
        }
        else {
            setPrice(newPrice)
        }
        const newFee = initialPercent * newPrice / 100;
        setInitial(newFee)
    }

    const initialChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{

        if(!Number(e.target.value)){
            return
        }

        const newInitial = Number(e.target.value.replace(/\D/g, ''));
        const newInitialPercent = newInitial * 100 / price;
        const maxInitial = data.initialPercent.max * price / 100;
        const minInitial = data.initialPercent.min * price / 100;

        if(newInitial > maxInitial) {
            setInitial(maxInitial)
            setInitialPercent(data.initialPercent.max)
        }
        else if (newInitial < minInitial) {
            setInitial(minInitial)
            setInitialPercent(data.initialPercent.min)
        }
        else {
            setInitial(newInitial)
            setInitialPercent(newInitialPercent)
        }
    }

    const initialPercentChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{

        if(!Number(e.target.value)){
            return
        }

        const newInitialPercent = Number(e.target.value.replace(/\D/g, ''));
        const newInitial = newInitialPercent * price / 100;
        const maxInitial = data.initialPercent.max * price / 100;
        const minInitial = data.initialPercent.min * price / 100;

        if(newInitialPercent > data.initialPercent.max) {
            setInitialPercent(data.initialPercent.max)
            setInitial(maxInitial)
        }
        else if (newInitialPercent < data.initialPercent.min) {
            setInitialPercent(data.initialPercent.min)
            setInitial(minInitial)
        }
        else {
            setInitialPercent(newInitialPercent)
            setInitial(newInitial)
        }
    }

    const monthsChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        if(!Number(e.target.value)){
            return
        }
        const newMonths = Number(e.target.value.replace(/\D/g, ''));
        if(newMonths > data.months.max) {
            setMonths(data.months.max)
        }
        else if (newMonths < data.months.min) {
            setMonths(data.months.min)
        }
        else {
            setMonths(newMonths)
        }
    }

    const submitHandler = () => {
        setIsDisabled(true)
        setIsLoading(true)
        axios.post("https://eoj3r7f3r4ef6v4.m.pipedream.net",
            {
                price,
                initialPercent,
                initial,
                months,
                monthPay,
                amount
            }, {
                headers: {
                    'Content-type': 'application/json'
                }}
        ).then(result=> {
            console.log(result)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setIsLoading(false)
            setIsDisabled(false)
        })
    }

    return (
        <div className={classes.app}>
            <div className={classes.container}>
                <h1 className={classes.title}>Рассчитайте стоимость автомобиля в&nbsp;лизинг</h1>
                <div className={classes.content}>
                    <MySuperInput
                        style={{gridArea: "a"}}
                        name={data.price.name}
                        title={data.price.title}
                        placeholder={data.price.placeholder}
                        min={data.price.min}
                        max={data.price.max}
                        step={data.price.step}
                        tab={data.price.tab}
                        value={price.toLocaleString()}
                        onChange={priceChangeHandler}
                    />
                    <MySuperInput
                        style={{gridArea: "b"}}
                        name={data.initialPercent.name}
                        title={data.initialPercent.title}
                        placeholder={data.initialPercent.placeholder}
                        min={data.initialPercent.min * price / 100}
                        max={data.initialPercent.max * price / 100}
                        step={price / 100}
                        readOnly
                        tab={
                            <span className={classes.bordered__tab}>
                                <input
                                    type="number"
                                    className={classes.tab__input}
                                    value={Math.trunc(initialPercent).toString()}
                                    onChange={initialPercentChangeHandler}
                                />
                                {data.initialPercent.tab}
                            </span>
                        }
                        value={Math.trunc(initial).toLocaleString() + " ₽"}
                        onChange={initialChangeHandler}
                    />
                    <MySuperInput
                        style={{gridArea: "c"}}
                        name={data.months.name}
                        title={data.months.title}
                        placeholder={data.months.placeholder}
                        min={data.months.min}
                        max={data.months.max}
                        step={data.months.step}
                        tab={data.months.tab}
                        value={months}
                        onChange={monthsChangeHandler}
                    />
                    <MyResult style={{gridArea: 'd'}} title="Сумма договора лизинга">{Math.trunc(amount).toLocaleString()}</MyResult>
                    <MyResult style={{gridArea: 'e'}} title="Ежемесячный платеж от">{Math.trunc(monthPay).toLocaleString()}</MyResult>
                    <MyButton
                        style={{gridArea: "f"}}
                        disabled={isDisabled}
                        onClick={submitHandler}
                    >
                        {isLoading
                            ? <MySpinner/>
                            : "Оставить заявку"
                        }
                    </MyButton>
                </div>
            </div>
        </div>
    );
}

export default App;
