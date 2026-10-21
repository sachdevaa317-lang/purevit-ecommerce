import Address from "./Address";
import Header from "../components/Header";
import Payment from "./Payment";
import { useState } from "react";

export default function Checkout() {

    const [selectedAddress, setSelectedAddress] = useState(null);

    return (
        <div>

            <Header />

            <div style={{ width: "50%", margin: "auto" }}>
<Address
    selectedAddress={selectedAddress}
    setSelectedAddress={setSelectedAddress}
/>

                <Payment
                    selectedAddress={selectedAddress}
                />

            </div>

        </div>
    );
}