//style
import { pageSetting } from '../../style'


const Experience = () => {

    return (
        <section 
            className={`relative w-full ${pageSetting.padding} flex flex-col gap-3`}>
                
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold font-loraFont">DISCOVER PRODUCTS.</h1>
                <p>See our newest collections for gifts and interesting goods.</p>
            </div>

            <div className="w-full rounded-2xl bg-tertiary p-12">
                <h2 className='text-xl'>HOW IT WORKS</h2>
                
            </div>
        </section>
    )

}

export default Experience