function GameCard({ name, bgImg }) {
  return (
    <div className="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 shadow-lg lg:mb-6">
      <div className="w-full overflow-hidden">
        <img
          src={bgImg}
          alt={name}
          className="aspect-video w-full object-cover"
        />
      </div>
      <div className="p-2 lg:p-4">
        <h3 className="text-2xl font-semibold">{name}</h3>
      </div>
    </div>
  );
}

export default GameCard;
