"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateCategoryForm from "./CreateCategoryForm";

export function AddCategory() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Cateory</Button>
      </DialogTrigger>
      <DialogContent >
      <CreateCategoryForm></CreateCategoryForm>
      </DialogContent>
    </Dialog>
  )
}
