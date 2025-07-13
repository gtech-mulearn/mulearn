import styles from './priceCard.module.css'
function PriceCard({prize,amount}:{prize:string,amount:string}) {
    return ( 
        <div className={styles.price_card}>
            <div className={styles.price_card_header}>
                <h2 className={styles.price_card_header_title}>{prize} Prize</h2>
                <p className="price-card__header__price">{amount} INR</p>
            </div>
        </div>
     );
}

export default PriceCard;