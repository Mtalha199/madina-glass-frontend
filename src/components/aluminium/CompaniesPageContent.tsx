"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import { aluminiumApi, AluminiumCompany } from "@/lib/api/aluminium";

function CompanyModal({
  isOpen,
  company,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  company?: AluminiumCompany | null;
  onClose: () => void;
  onSubmit: (data: { name: string }) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setName(company?.name || "");
  }, [company, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await onSubmit({ name: name.trim() });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[640px] m-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6">
        <h4 className="text-2xl font-semibold mb-4">{company ? "Edit Company" : "Add Company"}</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Company Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : company ? "Update Company" : "Save Company"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default function CompaniesPageContent() {
  const [companies, setCompanies] = useState<AluminiumCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<AluminiumCompany | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await aluminiumApi.getCompanies();
      setCompanies(res.data || res || []);
    } catch (error) {
      console.error("Failed to load companies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (data: { name: string }) => {
    await aluminiumApi.createCompany(data);
    await loadData();
  };

  const handleUpdate = async (id: number, data: { name: string }) => {
    await aluminiumApi.updateCompany(id, data);
    await loadData();
  };

  const handleDelete = async (company: AluminiumCompany) => {
    if (!window.confirm(`Delete ${company.name}? This will only work if it has no company items.`)) return;
    try {
      await aluminiumApi.deleteCompany(company.id);
      await loadData();
    } catch (error) {
      console.error("Failed to delete company", error);
      window.alert("Could not delete this company. Remove its items first.");
    }
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Companies" subtitle="Manage aluminium companies" />
        <Skeleton variant="rectangular" height={320} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Companies"
        subtitle="Create a company first, then manage that company's item list."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Aluminium", href: "/admin/aluminium" },
          { label: "Companies" },
        ]}
        action={
          <div className="flex gap-2 flex-wrap">
            <Link
              href="/admin/aluminium"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
            >
              Back to Aluminium
            </Link>
            <Button
              onClick={() => {
                setEditingCompany(null);
                setCompanyModalOpen(true);
              }}
            >
              Add Company
            </Button>
          </div>
        }
      />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Companies</h3>
            <p className="text-xs text-gray-500">Each company can have its own aluminium item list.</p>
          </div>
          <span className="text-sm text-gray-500">{companies.length} total</span>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 dark:bg-gray-900">
              <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {companies.length === 0 ? (
                <tr>
                  <td className="px-6 py-6 text-sm text-gray-500" colSpan={2}>
                    No companies yet. Add one to manage its item list.
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr key={company.id} className="text-sm">
                    <td className="px-6 py-4 font-medium">{company.name}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link className="text-brand-500 hover:underline" href={`/admin/aluminium/companies/${company.id}`}>
                          View Items
                        </Link>
                        <button
                          type="button"
                          className="text-brand-500 hover:underline"
                          onClick={() => {
                            setEditingCompany(company);
                            setCompanyModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-red-500 hover:underline"
                          onClick={() => {
                            void handleDelete(company);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CompanyModal
        isOpen={companyModalOpen}
        company={editingCompany}
        onClose={() => {
          setCompanyModalOpen(false);
          setEditingCompany(null);
        }}
        onSubmit={async (data) => {
          if (editingCompany) {
            await handleUpdate(editingCompany.id, data);
          } else {
            await handleCreate(data);
          }
        }}
      />
    </div>
  );
}
