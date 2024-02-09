
const Footer = () => {
 const time = new Date().getFullYear()
  return (
    <div className="bg-slate-900 py-4">
<div className='text-center'>
<p className="text-sm text-white">
  © {time} Next_Amazon. All right reserved.
</p>
</div>
    </div>
  )
}

export default Footer