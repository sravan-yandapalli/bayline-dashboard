import React from "react";

export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`rounded-lg border border-gray-200 bg-white ${className}`}>
    {children}
  </div>
);

export const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;
