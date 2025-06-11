interface Iprops {
    width: number,
    height: number,
    color: string,
}

function Circle({width, height, color}: Iprops) {
    const Cstyle = `w-${width} h-${height} bg-${color} rounded-full`;
  return (
    <div className={Cstyle}></div>
  )
}

export default Circle