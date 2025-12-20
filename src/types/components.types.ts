import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { type ChangeEvent } from "react";
import type { CommentType } from "./post.types";

export type ButtonVariant = "shade" | "primary" | "secondary" | "tertiary" | "outline" | "success" | "error";
export type ButtonSize = "zero" | "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string;
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}
//--------------------------------------------------------
export interface InputProps {
  id: string;
  label: string;
  accept?: string;
  type?: "text" | "email" | "password" | "number" | "file";
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValid?: boolean;
  errorMsg?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
}

export interface CommentProps {
  commentId: number;
  username: string;
  authorId: number | null;
  avatar: string | null;
  date: string;
  comment: string;
  onEdit: (commentId: number, newBody: string) => void;
  onDelete: (authorId: number, commentId: number) => void;
}

export interface LeftSidebarProps {
  setSidebars: React.Dispatch<
    React.SetStateAction<{
      left: boolean;
      right: boolean;
    }>
  >;
}

export interface PostCardProps {
  id: number;
  title: string;
  likes?: number;
}

export interface HeaderProps {
  setSidebars: React.Dispatch<
    React.SetStateAction<{
      left: boolean;
      right: boolean;
    }>
  >;
}

export interface NavbarProps {
  isOpen: boolean;
}

export interface CommentFormProps {
  postId: number;
  onCommentAdded: (comment: CommentType) => void;
}
