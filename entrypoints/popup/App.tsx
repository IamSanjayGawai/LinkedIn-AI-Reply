import "../../assets/tailwind.css"
function App() {

  return (
    <>
      
       <div className='flex flex-col items-center p-[30px] gap-3'> <img src="/wxt.svg" alt="" className='h-8 w-8 bg-white rounded-full ' />
       <h1 className='text-lg font-bold'>Linkedin AI Reply</h1></div>
       <div className='pl-[30px] pr-[30px] '>
        <p className='text-base font-semibold text-slate- mb-2 text-center'>Welcome to Linkedin AI Reply</p>
        <p className='text-sm text-center'>Linkedin AI Reply is a Chrome extension that helps you generate messages faster and more effectively.</p>
        <div className='mt-4 flex justify-center items-center'><button className='bg-black text-white pb-[6px] pt-[6px] w-52 rounded-md hover:bg-slate-950 mb-4'>Get Started</button></div>
       </div>
     
    </>
  );
}

export default App;