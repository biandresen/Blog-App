export interface DashboardLayoutProps {
  sidebars: {
    left: boolean;
    right: boolean;
  };
  setSidebars: React.Dispatch<
    React.SetStateAction<{
      left: boolean;
      right: boolean;
    }>
  >;
}

export interface LayoutProps {
  children: React.ReactNode;
  setSidebars: React.Dispatch<
    React.SetStateAction<{
      left: boolean;
      right: boolean;
    }>
  >;
}

export interface PostsLayoutProps {
  sidebars: {
    left: boolean;
    right: boolean;
  };
  setSidebars: React.Dispatch<
    React.SetStateAction<{
      left: boolean;
      right: boolean;
    }>
  >;
}
