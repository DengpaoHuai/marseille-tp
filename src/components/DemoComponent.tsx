type DemoComponentProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export const DemoComponent: React.FC<DemoComponentProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {children}
    </div>
  );
};

export default DemoComponent;
