export default function Loading() {
    return (
        <div className='lds-ring relative inline-block w-20 h-20'>
            <div className='absolute m-2 w-16 h-16 border-[0.5rem] border-t-secondary border-x-transparent border-b-transparent rounded-[50%] animate-[spin_1.2s_ease-in-out_infinite]'></div>
            <div className='absolute m-2 w-16 h-16 border-[0.5rem] border-t-secondary border-x-transparent border-b-transparent rounded-[50%] animate-[spin_1.2s_ease-in-out_infinite] delay-[-0.45s]'></div>
            <div className='absolute m-2 w-16 h-16 border-[0.5rem] border-t-secondary border-x-transparent border-b-transparent rounded-[50%] animate-[spin_1.2s_ease-in-out_infinite] delay-[-0.3s]'></div>
            <div className='absolute m-2 w-16 h-16 border-[0.5rem] border-t-secondary border-x-transparent border-b-transparent rounded-[50%] animate-[spin_1.2s_ease-in-out_infinite] delay-[-0.15s]'></div>
        </div>
    );
}
