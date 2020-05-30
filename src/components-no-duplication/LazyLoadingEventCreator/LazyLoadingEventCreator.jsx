import React, {useRef, useEffect} from 'react';
import './lazyLoadingEventCreator.css'

const LazyLoadingEventCreator = ({ observer }) =>{
    const ref = useRef(null);
    useEffect(()=>{
        const referance = ref.current;
        if(observer && referance)
            observer.observe(referance);
        return () => {
            if(observer) observer.unobserve(referance)
        }
    },[observer])
   return (
    <div className="lazy-loading-event-creator" ref={ref}>
    </div>
   )
   

}

export default LazyLoadingEventCreator;
