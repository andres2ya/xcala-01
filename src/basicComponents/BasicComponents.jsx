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
import CustomerCard from './CustomerCard/CustomerCard'
import FooterButton_TextOnly from './FooterButtons/FooterButton_TextOnly/FooterButton_TextOnly'
import FooterButton_check from './FooterButtons/FooterButton_check/FooterButton_check'
import FooterButton_list from './FooterButtons/FooterButton_list/FooterButton_list'
import FooterButton_Primary from './FooterButtons/FooterButton_Primary/FooterButton_Primary'
import FooterButtons_secundary from './FooterButtons/FooterButtons_secundary/FooterButtons_secundary'
import FooterButton_tertiary from './FooterButtons/FooterButton_tertiary/FooterButton_tertiary'
import PaymentMethod from './PaymentMethod/PaymentMethod'
import InputForm from './InputForm/InputForm'
import FooterSharingWithPrice from './FooterSharingWithPrice/FooterSharingWithPrice'
import ProductCardInCalculator from './ProductCardInCalculator/ProductCardInCalculator'
import NextIncome from './NextIncome/NextIncome'
import ProfitSummary from './ProfitSummary/ProfitSummary'
import DonutProgressBar from './DonutProgressBar/DonutProgressBar'
import MiniWidgetsToDonut from './MiniWidgetsToDonut/MiniWidgetsToDonut'
import CalculationFinalPrice from './CalculationFinalPrice/CalculationFinalPrice'
import AccountOptionBox from './AccountOptionBox/AccountOptionBox'
import NequiForm from './NequiForm/NequiForm'
import Modal from './../components/12-Modal/Modal'
import SideMenu from './SideMenu/SideMenu'
import QuickAccessIcons from './QuickAccessIcons/QuickAccessIcons'
import AdsCard from './AdsCard/AdsCard'
import ProgressCard from './ProgressCard/ProgressCard'
import InfoProgressCard from './InfoProgressCard/InfoProgressCard'
import MainFooterIcons from './MainFooterIcons/MainFooterIcons'
import SliderSingleProduct from './SliderSingleProduct/SliderSingleProduct'
import ProductHorizontalCard from './ProductHorizontalCard/ProductHorizontalCard'
import ProductShoppingCar from './ProductShoppingCar/ProductShoppingCar'
import PowerGamificationCard from './GamificationCards/PowerGamificationCard/PowerGamificationCard'
import MissionGamificationCard from './GamificationCards/MissionGamificationCard/MissionGamificationCard'
import FriendsCard from './GamificationCards/FriendsCard/FriendsCard'
import LevelCard from './GamificationCards/LevelCard/LevelCard'
import LevelRequirementsCard from './GamificationCards/LevelRequirementsCard/LevelRequirementsCard'
import GoalPlan from './GoalPlan/GoalPlan'
import WeekGoalPlan from './WeekGoalPlan/WeekGoalPlan'
import ProgressMonthGoal from './WeekGoalPlan/ProgressMonthGoal/ProgressMonthGoal'

export default class BasicComponents extends Component {

    state={
        openModal:false
    }

    //NOTE: Estado y funcion acompañante de "HorizontalScrollingContainerTabs"
    // state={
    //     selectedTab:null
    // }
    // selectTab=(e,idTab)=>{
    //     e.preventDefault()
    //     this.setState({selectedTab:idTab})
    // }
    //NOTE: Estado y funcion acompañante de "HorizontalScrollingContainerTabs"

    toggle=()=>{
        this.setState({openModal:!this.state.openModal})
        window.scrollTo(0,0)
    }
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
                            styleImg={{width:'35vw',height:'35vw'}}
                            mainImg={'https://decerditoss.com/wp-content/uploads/2020/03/6-3.jpg'}
                            isFavorite={false}
                            showUpWidget={true}
                            upWidget={'favorite'}//checkbox or favorite
                            showDownWidget={true}
                            downWidget={'share_and_car'}//share_and_car or checkbox

                            productName={'Juguetes Sup'}
                            isRecent={false}
                            withPromo={false}
                            promo={0.28}
                            oldPrice={'$oldprice'}
                            suggestedPrice={'$49.000'}
                            suggestedProfit={'$20.000'}
                            recentCustomer={'Nieves Bohorquez'}
                            recentFinalPrice={'$73.000'}
                            />
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <ProductInListCard
                            styleImg={{width:'35vw',height:'35vw'}}
                            mainImg={'https://decerditoss.com/wp-content/uploads/2020/03/6-3.jpg'}
                            isFavorite={false}
                            showUpWidget={true}
                            upWidget={'favorite'}//checkbox or favorite
                            showDownWidget={true}
                            downWidget={'share_and_car'}//share_and_car or checkbox

                            productName={'Juguetes Sup'}
                            isRecent={false}
                            withPromo={false}
                            promo={0.28}
                            oldPrice={'$oldprice'}
                            suggestedPrice={'$49.000'}
                            suggestedProfit={'$20.000'}
                            recentCustomer={'Nieves Bohorquez'}
                            recentFinalPrice={'$73.000'}
                            />
                        </div>                        <div className="col-6 d-flex justify-content-center">
                            <ProductInListCard
                            styleImg={{width:'35vw',height:'35vw'}}
                            mainImg={'https://decerditoss.com/wp-content/uploads/2020/03/6-3.jpg'}
                            isFavorite={false}
                            showUpWidget={true}
                            upWidget={'favorite'}//checkbox or favorite
                            showDownWidget={true}
                            downWidget={'share_and_car'}//share_and_car or checkbox

                            productName={'Juguetes Sup'}
                            isRecent={false}
                            withPromo={false}
                            promo={0.28}
                            oldPrice={'$oldprice'}
                            suggestedPrice={'$49.000'}
                            suggestedProfit={'$20.000'}
                            recentCustomer={'Nieves Bohorquez'}
                            recentFinalPrice={'$73.000'}
                            />
                        </div>                        <div className="col-6 d-flex justify-content-center">
                            <ProductInListCard
                            styleImg={{width:'35vw',height:'35vw'}}
                            mainImg={'https://decerditoss.com/wp-content/uploads/2020/03/6-3.jpg'}
                            isFavorite={false}
                            showUpWidget={true}
                            upWidget={'favorite'}//checkbox or favorite
                            showDownWidget={true}
                            downWidget={'share_and_car'}//share_and_car or checkbox

                            productName={'Juguetes Sup'}
                            isRecent={false}
                            withPromo={false}
                            promo={0.28}
                            oldPrice={'$oldprice'}
                            suggestedPrice={'$49.000'}
                            suggestedProfit={'$20.000'}
                            recentCustomer={'Nieves Bohorquez'}
                            recentFinalPrice={'$73.000'}
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

                <CustomerCard
                isSelected={false}
                showDetails={false}
                customerName={'Camilo Mejia'}
                city={'Bogota'}
                phone={'3183667033'}
                addressFirstLine={'Carrera 68D #24B-48'}
                addressSecondLine={'Conjunto Lausana - APTO 707'}
                addressPostalCode={'11050408'}
                />

                <FooterButton_TextOnly
                text={'Texto para probar el boton footer only text por ahi de dos lineas supongo...'}
                />

                <FooterButton_check
                text={'Texto para probar el boton de tipo check con dos lineas aproximadanemtne...'}
                funtionCheck={()=>alert('checked or no checked')}
                />
                <FooterButton_list
                nameList={'Frutas'}
                items={['Peras','Manzanas','etc']}
                />
                
                <FooterButton_Primary
                onClick={()=>alert('click')}
                text={'Boton primario'}
                />

                <FooterButtons_secundary
                onClick={()=>alert('click')}
                text={'Boton secudario'}
                />
                <FooterButton_tertiary
                onClick={()=>alert('click')}
                text={'Boton tertiary'}
                />

                <PaymentMethod
                paymentMethodSelected={'Contra entrega'}
                />

                <InputForm
                color={'blue'}//'blue' or 'red' or 'green' or 'grey'
                onChange={()=>alert('Changing...')}
                placeholder={'Nombre completo de etc'}
                value={'Andres'}
                type={'text'}
                />
                <InputForm
                color={'blue'}//'blue' or 'red' or 'green' or 'grey'
                onChange={()=>alert('Changing...')}
                placeholder={'Nombre completo de etc'}
                value={''}
                type={'text'}
                />
                <InputForm
                color={'red'}//'blue' or 'red' or 'green' or 'grey'
                onChange={()=>alert('Changing...')}
                placeholder={'Nombre completo de etc'}
                value={''}
                type={'text'}
                />
                <InputForm
                color={'green'}//'blue' or 'red' or 'green' or 'grey'
                onChange={()=>alert('Changing...')}
                placeholder={'Nombre completo de etc'}
                value={''}
                type={'text'}
                />
                <InputForm
                color={'grey'}//'blue' or 'red' or 'green' or 'grey'
                onChange={()=>alert('Changing...')}
                placeholder={'Nombre completo de etc'}
                value={''}
                type={'text'}
                />
                {/* <FooterSharingWithPrice
                finalPrice={'$69.000'}
                shipping={'Sin envio'}
                /> */}
                <ProductCardInCalculator
                mainImg={'https://decerditoss.com/wp-content/uploads/2020/03/6-3.jpg'}
                productName={'Juguetes Superplay texto adicional'}
                />

                <NextIncome
                style={{box:{backgroundColor:'#00d866'}}}
                text={'Tu proximo desembolso'}
                date={'El 15 de abril'}
                value={'$85.000'}
                />

                <ProfitSummary
                title={'Resumen'}
                items={[
                    {text:'Ganancia sin recaudar',description:'Ganancia de pedidos que aun no han sido entregados a tu cliente.',value:'$0'},
                    {text:'Ganancia sin desembolsar',description:'Ganancia de pedidos que aun no han sido entregados a tu cliente.',value:'$85.000'},
                    {text:'Ganancia pagada',description:'Ganancia de pedidos que aun no han sido entregados a tu cliente.',value:'$85.000'},
                ]}
                />

                <DonutProgressBar
                idDonutProgressBar={'DonutProgressBarOne'}
                userImg={'https://i.insider.com/5cb8b133b8342c1b45130629?width=1100&format=jpeg&auto=webp'}
                percent={45}
                isDonut={true}
                />

                <MiniWidgetsToDonut
                mode={'textWidgets'}//'onlyText or textWidgets or onlyWidgets
                text={'$6.000.000'}//¡Hola Leidy! //mutuamente excluyente con value
                value={''}//mutuamente excluyente con text
                label={'Meta global'}
                level={'Pro'}//Inicial or Intermedio or Pro
                points={''}//mutuamente excluyente con percent
                percent={'45'}//mutuamente excluyente con points
                tail={'%'}//pts or %
                icon={'icon-pencilonly'}//icon-pencilonly
                />

                <CalculationFinalPrice
                mode={'simple'}
                number={1}
                active={true}
                icon={''}//icon-pencilonly
                label={'Precio base'}
                styleLabel={{color:'#959595'}}//verde oscuro= #00b55a or gris=  #959595 or azul= #29abe2
                
                value={'$ 49.000'}
                styleBox={{backgroundColor:''}}

                options={['A','B','C','D']}
                optionSelectedDefault={'Seleccionar ciudad'}
                getSelectedOption={(e)=>alert('select: '+e.target.value)}

                inputDefaultValue={'$ 20.000'}
                getInputValue={(e)=>alert('select: '+e.target.value)}
                />
                <CalculationFinalPrice
                mode={'select'}
                number={2}
                active={true}
                icon={''}//icon-pencilonly
                label={'+ Costo de envio'}
                styleLabel={{color:'#959595'}}//verde oscuro= #00b55a or gris=  #959595 or azul= #29abe2
                
                value={'$ 69.000'}
                styleBox={{backgroundColor:''}}

                options={['BOGOTA $11.500','BARRANQUILLA $24.000','CARTAGENA $35.000','CALI $9.900']}
                optionSelectedDefault={'Seleccionar ciudad'}
                getSelectedOption={(e)=>alert('select: '+e.target.value)}

                inputDefaultValue={'$ 20.000'}
                getInputValue={(e)=>alert('select: '+e.target.value)}
                />
                <CalculationFinalPrice
                mode={'input'}
                number={3}
                active={true}
                icon={'icon-pencilonly'}//icon-pencilonly
                label={'+ Tu ganancia sugerida'}
                styleLabel={{color:'#00b55a'}}//verde oscuro= #00b55a or gris=  #959595 or azul= #29abe2
                
                value={'$ 69.000'}
                styleBox={{backgroundColor:''}}

                options={['BOGOTA $11.500','BARRANQUILLA "24.000','CARTAGENA DE INDIAS $35.000','CALI $9.900']}
                optionSelectedDefault={'Seleccionar ciudad'}
                getSelectedOption={(e)=>alert('select: '+e.target.value)}

                inputDefaultValue={'$ 20.000'}
                getInputValue={(e)=>alert('select: '+e.target.value)}
                />
                <CalculationFinalPrice
                mode={'box'}
                number={1}
                active={true}
                icon={''}//icon-pencilonly
                label={'= Precio de venta'}
                styleLabel={{color:'#29abe2'}}//verde oscuro= #00b55a or gris=  #959595 or azul= #29abe2
                
                value={'$ 69.000'}
                styleBox={{backgroundColor:''}}

                options={['A','B','C','D']}
                optionSelectedDefault={'Seleccionar ciudad'}
                getSelectedOption={(e)=>alert('select: '+e.target.value)}

                inputDefaultValue={'$ 20.000'}
                getInputValue={(e)=>alert('select: '+e.target.value)}
                />

                <AccountOptionBox
                withRightCircle={false}
                number={'10'}
                backgroundCircleColor={'#00d866'}
                icon={'icon-pencilonly'}
                text={'Mis ganancias'}
                url={'google.com.co'}
                />

                <NequiForm
                url={'google.com.co'}
                />

                <button onClick={this.toggle}>Open modal</button>
                {this.state.openModal?
                <Modal center={false} background={'rgb(34, 17, 74,0.95)'}>
                    <SideMenu toggle={this.toggle}/>
                </Modal>
                :null}

                <QuickAccessIcons
                icons={
                [{url:'google.com.co',icon:'icon-customericon-1',label:'Tus cliente'},
                {url:'google.com.co',icon:'icon-goalicon',label:'Tu meta'},
                {url:'google.com.co',icon:'icon-nequiquickicon',label:'Tu NEQUI'}]}
                />

                <AdsCard
                backgroundColor={'green'}//'green' or 'orange' or 'violet' or 'blue' or 'red'
                text={'Gana el 50% '}
                span={'de tu meta mensual'}
                url={'google.com.co'}
                />

                <ProgressCard
                text={''}
                value={'$0.0'}
                label={'Tu ganancia este mes'}
                progressBarTitle={'Primera venta'}
                percent={95}
                />

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-center">
                            <InfoProgressCard
                            isEmpty={true}
                            isRatio={true}
                            title={'Ventas este mes'}
                            value={''}
                            upValue={'0'}
                            downValue={'40'}
                            percent={50}
                            icon={'icon-plus'}
                            url={'google.com.co'}
                            />
                            <div style={{width:'15px'}}></div>
                            <InfoProgressCard
                            isEmpty={false}
                            isRatio={true}
                            title={'Ventas este mes'}
                            value={''}
                            upValue={0}
                            downValue={50}
                            percent={50}
                            icon={'icon-plus'}
                            url={'google.com.co'}
                            />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <MainFooterIcons
                icons={[
                {url:'google.com.co',icon:'icon-customericon-1',label:'Productos'},
                {url:'google.com.co',icon:'icon-goalicon',label:'Pedidos'},
                {url:'google.com.co',icon:'icon-nequiquickicon',label:'Favoritos'},
                {url:'google.com.co',icon:'icon-customericon-1',label:'Ganancias'},
                {url:'google.com.co',icon:'icon-nequiquickicon',label:'Cuenta'},
                ]}
                iconSelected={'Pedidos'}
                /> */}

                <SliderSingleProduct
                images={
                [
                    {nombre:'1',url:'google.com.co',img:'https://files.genial.guru/files/news/part_51/512160/419660-23603010-03finished-0-1509442137-1509442149-2000-1-1509442149-650-04f9ebaa03-1511556706.jpg'},
                    {nombre:'2',url:'google.com.co',img:'https://img.imagenescool.com/ic/frases/frases_126.jpg'},
                    {nombre:'3',url:'google.com.co',img:'https://files.genial.guru/files/news/part_51/512160/419660-23603010-03finished-0-1509442137-1509442149-2000-1-1509442149-650-04f9ebaa03-1511556706.jpg'},
                ]
                }
                />

                <ProductHorizontalCard
                styleImg={{width:'32vw',height:'32vw'}}
                mainImg={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0pUkTBKT6cODw06MZQZHdKQLczrOtvpdO0IL71Fm_nVbeGB0d&usqp=CAU'}
                isFavorite={true}
                showUpWidget={false}// true or false
                upWidget={'favorite'}//checkbox or favorite
                showDownWidget={false}// true or false
                downWidget={''}//share_and_car

                showDeleteWidget={false}
                footerImgSpace={'empty'}//empty or guideNumber
                guideNumber={'782klsl'}
                middleSpace={'empty'}// empty or 
                footerSpace={'pricePlusQuantity'}//empy or pricePlusQuantity or pricePlusInput
                price={'$49.000'}
                quantity={1}
                getValue={(value)=>alert(value)}
                />

                <ProductShoppingCar
                downCards={[
                    {text:'Se enviara a Nieves Bohorquez en Bucaramanga',icon:'icon-pencilonly',url:'google.com.co'},
                    {text:'Precio de venta $128.000',icon:'icon-pencilonly',url:'google.com.co'},
                ]}

                styleImg={{width:'32vw',height:'32vw'}}
                mainImg={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0pUkTBKT6cODw06MZQZHdKQLczrOtvpdO0IL71Fm_nVbeGB0d&usqp=CAU'}
                isFavorite={true}
                showUpWidget={false}// true or false
                upWidget={'favorite'}//checkbox or favorite
                showDownWidget={false}// true or false
                downWidget={''}//share_and_car

                showDeleteWidget={true}
                footerImgSpace={'empty'}//empty or guideNumber
                guideNumber={'782klsl'}
                middleSpace={'empty'}// empty or 
                footerSpace={'pricePlusQuantity'}//empy or pricePlusQuantity or pricePlusInput
                price={'$49.000'}
                quantity={1}
                getValue={(value)=>alert(value)}
                />
                
                <PowerGamificationCard
                powerImg={'https://2.bp.blogspot.com/-T_V9KrLSzhg/UyGQGH732jI/AAAAAAAATlQ/kRcR7spyZ2k/s1600/neil-dg-tyson-cosmos.jpg'}
                firstLineName={'Nombre corto y'}
                secondLineName={'explicativo'}
                />

                <MissionGamificationCard
                missionImg={'https://mx.web.img3.acsta.net/r_640_360/newsv7/18/01/14/16/25/1812737.jpg'}
                text={'Nombre de la mision ombre de la mision creo.'}
                callToAction={'Ver mas'}
                styleFooter={{backgroundColor:'black',color:'white'}}
                styleCTA={{backgroundColor:'white',color:'black'}}
                />

                <FriendsCard
                firstName={'Andres'}
                lastName={'Yaya'}
                styleTwoWords={{backgroundColor:'#cccccc',color:'white'}}
                twoWords={'RF'}
                friendImg={'https://www.elcolombiano.com/documents/10157/0/677x365/49c0/580d365/none/11101/OKKX/image_content_35367898_20200311080124.jpg'}
                />
                
                <LevelCard
                level={'Intermedio'}
                text={'Lograr tu meta mensual y 1000 puntos'}
                benefits={'10 beneficios >'}
                url={'google.com.co'}
                />

                <LevelRequirementsCard
                requirements={[
                    {filled:true,name:'Nombre del item',description:'Descripcion corta pero clara del item que se entienda bien'},
                    {filled:false,name:'Nombre del item',description:'Descripcion corta pero clara del item que se entienda bien'},
                    {filled:true,name:'Nombre del item',description:'Descripcion corta pero clara del item que se entienda bien'},
                ]}
                />

                <GoalPlan
                upLabel={'4 Metas mensuales de'}
                upValue={'$ 1.500.000'}
                upValueLabel={'cada una'}
                downLabel={'Con objetivos semanales de'}
                downValue={'$ 375.000'}
                downValueLabel={'cada uno'}
                />

                <WeekGoalPlan
                upLabel={'¿Cuantas ventas vas a lograr esta semana?'}
                downValueLeft={'10'}
                downValueLabelLeft={'Numero ventas'}
                downValueRight={'= $ 0.0'}
                downValueLabelRight={'Ganancia objetivo'}
                />

                <ProgressMonthGoal
                title={'Progreso meta mensual'}
                labelBar={'$ 1.500.000'}
                items={[
                    {isBar:true,percent:'33',styleBar:{width: '33%',height:'7.5px',backgroundColor:'rgb(0, 123, 255)'},styleIndicator:{backgroundColor:'rgb(0, 123, 255)'},value:'$ 300.000',label:'Avance este mes'},
                    {isBar:true,percent:'33',styleBar:{width: '33%',height:'7.5px',backgroundColor:'#00ef7f'},styleIndicator:{backgroundColor:'#00ef7f'},value:'$ 500.000',label:'Ganancia objetivo esta semana'},
                    {isBar:false,styleIndicator:{backgroundColor:'grey'},value:'$ 700.000',label:'Restante este mes'},
                ]}
                />

            </div>
        )
    }
}
