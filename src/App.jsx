import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Die from './Die'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
    
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    
    useEffect(() => {
        const allheld = dice.every(die=>die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if(allheld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])

    function allNewDice () {
        const arr = []
        for(let i=0;i<10;i++) {
            arr.push({
                value: Math.floor(Math.random()*6),
                isHeld: false,
                id: nanoid()
            })
        }
        return arr
    }
    
    
    function rollDice() {
        if(tenzies == false) {
            setDice(oldDice => oldDice.map(
                die => {
                    return die.isHeld === true ? die : {...die, value: Math.floor(Math.random()*6), id:nanoid()}
                }
            ))
        } else {
            setDice(allNewDice())
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(
            die => {
                return die.id === id ? {...die, isHeld: !die.isHeld} : die
            }
        ))
    }

    

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className='title'>Tenzies</h1>
            <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value
            between rolls.</p>
            <div className='dice-container'>
                {dice.map((dicenum)=> {
                    return (
                        <Die 
                            isHeld={dicenum.isHeld}
                            value={dicenum.value}
                            key={dicenum.id}
                            holdDice={() => holdDice(dicenum.id)}
                        />
                        )
                    }
                    )
                }
            </div>
            <button className='rollDiceButtom' onClick={rollDice}>Roll</button>
        </main>
    )    
}