interface Iprops {
    width: number,
    height: number,
    bgColor: string,
}

function Circle({width, height, bgColor}: Iprops) {
    const Cstyle = `w-${width} h-${height} ${bgColor} rounded-full`;
  return (
    <div className={Cstyle}></div>
  )
}

export default Circle