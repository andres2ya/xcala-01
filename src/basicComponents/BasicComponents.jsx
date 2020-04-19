import React, { Component } from 'react'
import HeaderPrincipal from './HeaderPrincipal/HeaderPrincipal'
import HeaderCategory from './HeaderCategory/HeaderCategory'
import babiesCategory from '../assets/babiesCategory.jpg'
import HorizontalScrollingContainerTabs from './HorizontalScrollingContainerTabs/HorizontalScrollingContainerTabs'
import HeaderProduct from './HeaderProduct/HeaderProduct'
import HeaderSecundary from './HeaderSecundary/HeaderSecundary'
import SearchBar from './SearchBar/SearchBar'
import CategoriesHorizontalScrolling from './CategoriesHorizontalScrolling/CategoriesHorizontalScrolling'
import SliderPrincipal from './SliderPrincipal/SliderPrincipal'
import CatalogsNews from './CatalogsNews/CatalogsNews'
import ProductInListCard from './ProductInListCard/ProductInListCard'
import VariantBox from './VariantBox/VariantBox'
import ProductDescriptionBox from './ProductDescriptionBox/ProductDescriptionBox'
import ProductBenefitsListBox from './ProductBenefitsListBox/ProductBenefitsListBox'
import FooterProductPage from './FooterProductPage/FooterProductPage'
import UpFooterSuggestedPrice from './UpFooterSuggestedPrice/UpFooterSuggestedPrice'
import CalculationTable from './CalculationTable/CalculationTable'
import ProfitWidget from './ProfitWidget/ProfitWidget'
import FinalPriceWidget from './FinalPriceWidget/FinalPriceWidget'
import OptionsWithText from './OptionsWithText/OptionsWithText'

export default class BasicComponents extends Component {

    //NOTE: Estado y funcion acompañante de "HorizontalScrollingContainerTabs"
    state={
        selectedTab:null
    }
    selectTab=(e,idTab)=>{
        e.preventDefault()
        this.setState({selectedTab:idTab})
    }
    //NOTE: Estado y funcion acompañante de "HorizontalScrollingContainerTabs"


    render() {
        return (
            <div>
                <HeaderPrincipal userName={'Leidy'} userProfit={'$98.500'}/>
                <HeaderCategory 
                categoryImage={babiesCategory}
                categoryName={'Bebes'}
                categoryDescription={'Juguetes, ropa, accesorios...'}
                itemsInCar={1}
                />
                <HorizontalScrollingContainerTabs 
                functionSelectTab={this.selectTab} 
                selectedTab={this.state.selectedTab} 
                tabs={['Juguetes','Ropa','Accesorios','Teteros','Estimulacion temprana','Otros']}/>
                <HeaderProduct
                supplierName={'Babes for the Worl...'}
                supplierTwoWords={'BW'}
                isFavorite={true}
                itemsInCar={1}
                />
                <HeaderSecundary
                leftIcon={'backRow'}
                rightOption={'newItem'} //'newItem' or 'widgets' or none
                newItemText={'Nuevo cliente'}
                // urlNewItemForm={}
                itemsInCar={1}
                title={'1.Seleccionar'}
                titleDescription={'a tu cliente'}
                />
                <SearchBar
                typeAreaText={'Buscar en xcala'}
                showFilter={false}/>
                <CategoriesHorizontalScrolling categories={[
                    {img:'https://significadodelcolor.net/wp-content/uploads/2019/11/color-celeste.jpg',
                    nombre:'Bebes'},
                    {img:'https://image.freepik.com/foto-gratis/bonita-composicion-cuadrada-hojas-color-rosa-sobre-fondo-azul_24972-583.jpg',
                    nombre:'Tecnologia'},
                    {img:'https://significadodelcolor.net/wp-content/uploads/2019/11/color-celeste.jpg',
                    nombre:'Zapatos'},
                    {img:'https://image.freepik.com/foto-gratis/bonita-composicion-cuadrada-hojas-color-rosa-sobre-fondo-azul_24972-583.jpg',
                    nombre:'Regalos'},
                    {img:'https://significadodelcolor.net/wp-content/uploads/2019/11/color-celeste.jpg',
                    nombre:'Libros'},
                ]}/>
                <SliderPrincipal sliders={[
                    {img:'https://i.ytimg.com/vi/oO-cMiwqWQ4/maxresdefault.jpg',
                    url:'A',nombre:'Primera'},
                    {img:'https://i.ytimg.com/vi/oO-cMiwqWQ4/maxresdefault.jpg',
                    url:'B',nombre:'Segunda'},
                    {img:'https://i.ytimg.com/vi/oO-cMiwqWQ4/maxresdefault.jpg',
                    url:'C',nombre:'Tercera'},
                ]}/>
                <CatalogsNews
                sixImg={[
                    'https://image.freepik.com/foto-gratis/bonita-composicion-cuadrada-hojas-color-rosa-sobre-fondo-azul_24972-583.jpg',
                    'https://image.freepik.com/foto-gratis/bonita-composicion-cuadrada-hojas-color-rosa-sobre-fondo-azul_24972-583.jpg',
                    'https://image.freepik.com/foto-gratis/bonita-composicion-cuadrada-hojas-color-rosa-sobre-fondo-azul_24972-583.jpg',
                    'https://image.freepik.com/foto-gratis/bonita-composicion-cuadrada-hojas-color-rosa-sobre-fondo-azul_24972-583.jpg',
                    'https://image.freepik.com/foto-gratis/bonita-composicion-cuadrada-hojas-color-rosa-sobre-fondo-azul_24972-583.jpg',
                    'https://image.freepik.com/foto-gratis/bonita-composicion-cuadrada-hojas-color-rosa-sobre-fondo-azul_24972-583.jpg'
                ]}
                catalogName={'Peluches de la marca Superplay'}
                catalogDescription={'Peluches rellenos de amor'}
                urlCatalogo={'urlCatalogo'}
                isSharingButton={false}
                buttonName={'Previsualizar'}//Pendiente - Previsualizar
                colorButton={'#00d866'}//#ed1e79(rosado) - #00d866(verde)
                />

                <div className="container">
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center">
                            <ProductInListCard
                            productName={'Juguetes Sup'}
                            isRecent={false}
                            withPromo={false}
                            promo={0.28}
                            mainImg={'https://decerditoss.com/wp-content/uploads/2020/03/6-3.jpg'}
                            suggestedPrice={'$49.000'}
                            suggestedProfit={'$20.000'}
                            recentCustomer={'Nieves Bohorquez'}
                            recentFinalPrice={'$73.000'}
                            isFavorite={false}
                            />
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <ProductInListCard
                            productName={'Juguetes Sup'}
                            isRecent={false}
                            withPromo={true}
                            promo={0.28}
                            mainImg={'https://www.dhresource.com/0x0/f2/albu/g10/M00/32/7D/rBVaWV1fnYuAM2qWAABorF5kl40246.jpg'}
                            suggestedPrice={'$49.000'}
                            suggestedProfit={'$20.000'}
                            recentCustomer={'Nieves Bohorquez'}
                            recentFinalPrice={'$73.000'}
                            isFavorite={false}
                            />
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <ProductInListCard
                            productName={'Juguetes Sup'}
                            isRecent={false}
                            withPromo={false}
                            promo={0.28}
                            mainImg={'https://decerditoss.com/wp-content/uploads/2020/03/6-3.jpg'}
                            suggestedPrice={'$49.000'}
                            suggestedProfit={'$20.000'}
                            recentCustomer={'Nieves Bohorquez'}
                            recentFinalPrice={'$73.000'}
                            isFavorite={false}
                            />
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <ProductInListCard
                            productName={'Juguetes Sup'}
                            isRecent={false}
                            withPromo={false}
                            promo={0.28}
                            mainImg={'https://decerditoss.com/wp-content/uploads/2020/03/6-3.jpg'}
                            suggestedPrice={'$49.000'}
                            suggestedProfit={'$20.000'}
                            recentCustomer={'Nieves Bohorquez'}
                            recentFinalPrice={'$73.000'}
                            isFavorite={false}
                            />
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <ProductInListCard
                            productName={'Juguetes Sup'}
                            isRecent={false}
                            withPromo={true}
                            promo={0.28}
                            mainImg={'https://www.dhresource.com/0x0/f2/albu/g10/M00/32/7D/rBVaWV1fnYuAM2qWAABorF5kl40246.jpg'}
                            suggestedPrice={'$49.000'}
                            suggestedProfit={'$20.000'}
                            recentCustomer={'Nieves Bohorquez'}
                            recentFinalPrice={'$73.000'}
                            isFavorite={false}
                            />
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <ProductInListCard
                            productName={'Juguetes Sup'}
                            isRecent={false}
                            withPromo={false}
                            promo={0.28}
                            mainImg={'https://www.dhresource.com/0x0/f2/albu/g10/M00/32/7D/rBVaWV1fnYuAM2qWAABorF5kl40246.jpg'}
                            suggestedPrice={'$49.000'}
                            suggestedProfit={'$20.000'}
                            recentCustomer={'Nieves Bohorquez'}
                            recentFinalPrice={'$73.000'}
                            isFavorite={false}
                            />
                        </div>
                    </div>
                </div>
                
                <VariantBox
                variantName={'Talla'}
                variantFormat={7}
                />

                <ProductDescriptionBox
                productName={'Juguetes Superplay'}
                sku={'54545akhs7690aKHGa'}
                description={'It is a long es when lookinletters, as opp packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'}
                />

                <ProductBenefitsListBox
                title={'Beneficios'}//Detalles tecnicos, Garantia
                text={'-It is a long established fact that a reader will be distrIt is a long established fact that a reader will be distr'}
                />

                {/* <FooterProductPage/>

                <UpFooterSuggestedPrice
                suggestedPrice={'$49.000'}
                promo={''}
                suggestedProfit={'$20.000'}
                /> */}

                <CalculationTable
                withOptions={true}
                title={'Selecciona un medio de pago'}
                optionsFormat={2}
                options={[
                    {name:'Online',spanBold:'Con pago online, ',description:'xcala se encargara de cobrarle a tu cliente al momento de al entrega. Tu ganancia sera transferida directamente a tu cuenta NEQUI'},
                    {name:'Contra entrega',spanBold:'Con Contra entrega, ',description:'xcala se encargara de cobrarle a tu cliente al momento de al entrega. Tu ganancia sera transferida directamente a tu cuenta NEQUI'},
                    {name:'Link de cobro',spanBold:'Con link de cobro, ',description:'xcala se encargara de cobrarle a tu cliente al momento de al entrega. Tu ganancia sera transferida directamente a tu cuenta NEQUI'},
                ]}

                items={[
                    {type:'normal',
                    text:'Costo productos',
                    styleText:{color:'#959595'},
                    simbol:'',
                    value:'$60.500',
                    styleValue:{color:'#4e4e4e'},
                    },
                    {type:'normal',
                    text:'Costo productos',
                    styleText:{color:'#959595'},
                    simbol:'',
                    value:'$60.500',
                    styleValue:{color:'#4e4e4e'},
                    },
                    {type:'link',
                    text:'Ver mas',
                    styleText:{color:'#959595'},
                    simbol:'',
                    value:'',
                    styleValue:{color:'#4e4e4e'},
                    },
                    {type:'subtotal',
                    styleType:{borderTop:'1px solid #959595'},
                    text:'Envio a bucaramanga',
                    styleText:{color:'#959595'},
                    simbol:'=',
                    value:'$65.000',
                    styleValue:{color:'#4e4e4e'},
                    },
                    {type:'total',
                    styleType:{backgroundColor:'#29abe2'},
                    text:'Envio a bucaramanga',
                    styleText:{color:'white'},
                    simbol:'+',
                    value:'$60.500',
                    styleValue:{color:'white',textDecoration:'line-through'},
                    },
                ]}
                />

                <ProfitWidget
                simbol={'='}
                text={'Ingresa tu ganancia'}
                backgroundColorText={'#00d866'}
                value={'$20.000*'}
                backgroundColorValue={'#00ef7f'}
                finalLittleText={'* Ganancia sugerida (Puedes cambiarla)'}
                finalLittleTextColor={'#00ef7f'}
                />
                <FinalPriceWidget
                backgroundColorBox={'rgb(41, 171, 226)'}
                simbol={'='}
                text={'Precio de venta*'}
                value={'$49.000'}
                finalLittleText={'* Precio final que pagara tu cliente'}
                finalLittleTextColor={'rgb(41, 171, 226)'}
                />

                <OptionsWithText
                title={'Selecciona un medio de pago'}
                optionsFormat={1}
                options={[
                    {name:'Online',spanBold:'Con pago online, ',description:'xcala se encargara de cobrarle a tu cliente al momento de al entrega. Tu ganancia sera transferida directamente a tu cuenta NEQUI'},
                    {name:'Contra entrega',spanBold:'Con Contra entrega, ',description:'xcala se encargara de cobrarle a tu cliente al momento de al entrega. Tu ganancia sera transferida directamente a tu cuenta NEQUI'},
                    {name:'Link de cobro',spanBold:'Con link de cobro, ',description:'xcala se encargara de cobrarle a tu cliente al momento de al entrega. Tu ganancia sera transferida directamente a tu cuenta NEQUI'},
                ]}
                />

                

            </div>
        )
    }
}
