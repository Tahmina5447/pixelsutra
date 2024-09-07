import React from 'react';

const CustomFeaturedCategoriesSkeleton = () => {
    const cards =[1,2,3,4,5,6]
    return (
       
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                cards.map((card,index)=><div key={index} className='w-full h-[250px] bg-red-600 skeleton'>

                </div>)
            }
        </div>
    );
};

export default CustomFeaturedCategoriesSkeleton;