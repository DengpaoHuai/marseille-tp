type CustomCardProps = {
  title: string;
  footer: string;
  children: React.ReactNode;
};

const CustomCard: React.FC<CustomCardProps> = ({ title, footer, children }) => {
  return (
    <div className="card">
      <h1>{title}</h1>
      {children}
      <footer>
        <p>{footer}</p>
      </footer>
    </div>
  );
};

export default CustomCard;
