export const CustomerViewCommon = ({ TITLE, ICON, VALUE }) => {
    return (
      <>
        <p className="text-gray-500 mb-2">{TITLE}</p>
        <div className="flex items-center gap-3">
          {ICON && <span className="w-5 h-5 text-gray-500">{ICON}</span>}
          <p className="font-medium">{VALUE}</p>
        </div>
      </>
    );
  };
  