function HomeCategoryCard({ icon, caption }) {
  return (
    <div className="w-[195px] h-[119px] border-[1px] border-slate-100 shadow-lg shadow-slate-100 rounded-xl text-center">
      <div className="h-[64px] w-[64px] mx-auto my-[8px] overflow-hidden relative">
        <Image src={icon} layout="fill" objectFit="cover" />
      </div>
      <div className="font-bold text-primary">{caption}</div>
    </div>
  );
}

export default HomeCategoryCard;
