
export default function Greetings(): string {

    const hour = new Date().getHours()
    let messageGreetings = "" 

    if(hour < 12){
        messageGreetings = "Good Morning!"
    }else if(hour < 18){
        messageGreetings = "Good Afternoon!"
    }else{
        messageGreetings = "Good Evening!"
    }


    return (messageGreetings)
}
