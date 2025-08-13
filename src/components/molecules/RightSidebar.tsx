const RightSidebar = () => {
  return (
    <aside className="bg-[var(--primary-shade)] absolute right-0 w-full h-full md:h-auto md:max-w-55 md:static">
      <div className="p-4">
        <h3 className="text-lg font-semibold">Right Sidebar</h3>
        <p>Extra dashboard tools go here.</p>
      </div>
    </aside>
  );
};

export default RightSidebar;
