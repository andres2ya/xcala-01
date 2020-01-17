import React, { Component } from 'react'

export default class PruebasPayU extends Component {
    render() {
        return (
            <div>
                <form method="POST" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu">
                    <input name="merchantId"    type="hidden"  value="508029"   />
                    <input name="accountId"     type="hidden"  value="512321" />
                    <input name="description"   type="hidden"  value="Test PAYU"  />
                    <input name="referenceCode" type="hidden"  value="PRUEBAXCALA-13" />
                    <input name="amount"        type="hidden"  value="3"   />
                    <input name="tax"           type="hidden"  value="0"  />
                    <input name="taxReturnBase" type="hidden"  value="0" />
                    <input name="currency"      type="hidden"  value="USD" />
                    <input name="signature"     type="hidden"  value="5dcd621cc1d5ea73633854d7383caa4d"/>
                    <input name="test"          type="hidden"  value="1" />
                    <input name="buyerEmail"    type="hidden"  value="test@test.com" />
                    <input name="responseUrl"    type="hidden"  value="https://prueba-payu-deploy.firebaseapp.com/respuestapayu" />
                    <input name="confirmationUrl"    type="hidden"  value="https://prueba-payu-deploy.firebaseapp.com/confirpayu" />
                    <label htmlFor="">Pruebas payu 1</label>
                    <input name="Submit"        type="submit"  value="Enviar6" />
                </form>
            </div>
        )
    }
}
