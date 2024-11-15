"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // ShadCN UI Dialog component
import { Input } from "@/components/ui/input";
import { CategoryData } from "@/types/prisma-data-types";
import { X, Edit2 } from "lucide-react"; // Icons for delete and edit
import {
  useAddSubCategory,
  useDeleteCategory,
  useDeleteSubCategory,
  useEditCategory,
  useEditSubCategory,
} from "@/services/category/mutation";

// Column definition for category table
export const CategoryColumns: ColumnDef<CategoryData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap space-x-5 items-center">
          <CategoryItem category={row.original}></CategoryItem>
        </div>
      );
    },
  },
  {
    accessorKey: "subcategories",
    header: "Sub-Categories",
    cell: ({ row }) => {
      const subcategories = row.original.subcategories;

      return (
        <div className="flex flex-wrap space-x-5 items-center">
          <CreateSubcategory
            catName={row.original.name}
            categoryId={row.original.id}
          ></CreateSubcategory>
          <div
            className="border-b-[3px] border-blue-400 px-1
           py-1 flex flex-wrap space-x-4"
          >
            {subcategories.map((subcategory) => (
              <SubcategoryItem
                key={subcategory.id}
                subcategory={subcategory}
                categoryId={row.original.id} // Pass categoryId to identify the parent category
              />
            ))}
          </div>
        </div>
      );
    },
  },
];

// create subCat

function CreateSubcategory({
  categoryId,
  catName,
}: {
  categoryId: number;
  catName: string;
}) {
  // TODO: Implement create subcategory logic (e.g., API call)
  console.log(
    `Create Subcategory Name: ${name} for Category ID: ${categoryId}`
  );

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Control the dialog visibility
  const [editName, setEditName] = useState(""); // Store the edit name
  const subCatMutation = useAddSubCategory();

  const handleCreate = () => {
    const data = {
      name: editName,
      categoryId: categoryId,
    };

    subCatMutation.mutate(data, {
      onSuccess: () => {
        console.log("Subcategory created successfully");
        setIsEditDialogOpen(false); // Close the dialog after creating
      },
    });
  };

  return (
    <div
      className="flex items-center space-x-2 
     w-min px-1 py-1"
    >
      <Button onClick={() => setIsEditDialogOpen(true)} variant="outline">
        ADD
      </Button>

      {/* Edit Subcategory Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create Subcategory - <span className="font-bold">{catName}</span>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Subcategory Name"
              />
              <Button type="button" onClick={handleCreate}>
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Subcategory Item Component
function SubcategoryItem({
  subcategory,
  categoryId,
}: {
  subcategory: { id: number; name: string };
  categoryId: number;
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Control the dialog visibility
  const [editName, setEditName] = useState(subcategory.name); // Store the edit name

  const useEditSubCatMutation = useEditSubCategory();
  const useDeleteSubCatMutation = useDeleteSubCategory();

  const handleDelete = () => {
    useDeleteSubCatMutation.mutate(subcategory.id, {
      onSuccess: () => {
        console.log("Subcategory deleted successfully");
        setIsEditDialogOpen(false); // Close the dialog after deleting
      },
    });
  };

  const handleEdit = () => {
    const data = {
      name: editName,
      id: subcategory.id,
      categoryId: subcategory.id,
    };
    console.log(data);

    useEditSubCatMutation.mutate(data, {
      onSuccess: () => {
        setIsEditDialogOpen(false); // Close the dialog after editing
      },
    });
  };

  return (
    <div
      className="flex items-center space-x-1 bg-gray-100 rounded-md
     w-min px-1 py-1"
    >
      <span className="font-bold">{subcategory.name}</span>
      <Button variant="ghost" size="icon" onClick={handleDelete}>
        <X size={15} className="text-red-500" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsEditDialogOpen(true)}
      >
        <Edit2 size={15} className="text-blue-500" />
      </Button>

      {/* Edit Subcategory Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subcategory</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Subcategory Name"
              />
              <Button type="button" onClick={handleEdit}>
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CategoryItem({
  category,
}: {
  category: { id: number; name: string };
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Control the dialog visibility
  const [editName, setEditName] = useState(category.name); // Store the edit name

  const useEditCatMutation = useEditCategory();
  const useDeleteCatMutation = useDeleteCategory();

  const handleDelete = () => {
    useDeleteCatMutation.mutate(category.id, {
      onSuccess: () => {
        console.log("Category deleted successfully");
        setIsEditDialogOpen(false); // Close the dialog after deleting
      },
    });
  };

  const handleEdit = () => {
    const data = {
      name: editName,
      id: category.id,
      categoryId: category.id,
    };
    console.log(data);

    useEditCatMutation.mutate(data, {
      onSuccess: () => {
        setIsEditDialogOpen(false); // Close the dialog after editing
      },
    });
  };

  return (
    <div
      className="flex items-center space-x-2  rounded-md
     w-min px-1 py-1"
    >
      <div className="flex items-center">
        <span className="font-bold">{category.name}</span>
        <Button variant="ghost" size="icon" onClick={handleDelete}>
          <X size={15} className="text-red-500" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Edit2 size={15} className="text-blue-500" />
        </Button>
      </div>
      {/* Edit Subcategory Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category - {category.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Subcategory Name"
              />
              <Button type="button" onClick={handleEdit}>
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
