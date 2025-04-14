import CommonDrawer from "@/Commons/DrawerCommon";
import { APICALL } from "@/components/Api/ApiCall";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { API_END_POINT, API_TYPE, TOAST_MESSAGES } from "@/Constant";
import React, { useEffect, useState } from "react";

const SpecificRole = ({ ID }) => {
  const [loading, setLoading] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [workingData, setWorkingData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedSubmenu, setSelectedSubmenu] = useState(null);
  const [changedPermissionIds, setChangedPermissionIds] = useState(new Set());

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.PERMISSION.replace("{id}", ID)}`,
      setLoading,
      null,
      (data) => {
        setOriginalData(data);
        setWorkingData(JSON.parse(JSON.stringify(data)));
      },
      () => {}
    );
  };

  const handleModuleCheckboxChange = (moduleId, checked) => {
    setWorkingData((prevData) => {
      const updatedData = prevData.map((module) => {
        if (module.id === moduleId) {
          let changedIds = [];
          if (module.sub_menu?.length > 0) {
            changedIds = module.sub_menu
              .flatMap((submenu) => submenu.permissions)
              .filter((perm) => perm.access !== checked)
              .map((perm) => perm.id);
          } else if (module.permissions?.length > 0) {
            changedIds = module.permissions
              .filter((perm) => perm.access !== checked)
              .map((perm) => perm.id);
          }

          setChangedPermissionIds((prev) => new Set([...prev, ...changedIds]));

          return {
            ...module,
            access: checked,
            ...(module.sub_menu?.length > 0
              ? {
                  sub_menu: module.sub_menu.map((submenu) => ({
                    ...submenu,
                    access: checked,
                    permissions: submenu.permissions.map((perm) => ({
                      ...perm,
                      access: checked,
                    })),
                  })),
                }
              : {
                  permissions: module.permissions?.map((perm) => ({
                    ...perm,
                    access: checked,
                  })),
                }),
          };
        }
        return module;
      });
      return updatedData;
    });
  };

  const handleSubmenuClick = (submenu) => {
    setSelectedSubmenu({ ...submenu });
    setOpenDrawer(true);
  };

  const handleDrawerClose = (open) => {
    setOpenDrawer(open);
    if (!open) setSelectedSubmenu(null);
  };

  const handleSubMenu = (submenuId, checked) => {
    setSelectedSubmenu((prev) => {
      const updatedSubmenu = { ...prev };
      const changedIds = updatedSubmenu.permissions
        .filter((perm) => perm.access !== checked)
        .map((perm) => perm.id);

      updatedSubmenu.access = checked;
      updatedSubmenu.permissions = updatedSubmenu.permissions.map((perm) => ({
        ...perm,
        access: checked,
      }));

      setChangedPermissionIds((prev) => new Set([...prev, ...changedIds]));

      setWorkingData((prevData) =>
        prevData.map((module) => ({
          ...module,
          sub_menu: module.sub_menu.map((submenu) =>
            submenu.id === submenuId ? updatedSubmenu : submenu
          ),
        }))
      );

      return updatedSubmenu;
    });
  };

  const handlePermissionChange = (permissionId, checked, isModuleLevel = false) => {
    if (isModuleLevel) {
      setWorkingData((prevData) => {
        const updatedData = prevData.map((module) => {
          if (module.permissions?.some((perm) => perm.id === permissionId)) {
            const updatedPermissions = module.permissions.map((perm) =>
              perm.id === permissionId ? { ...perm, access: checked } : perm
            );
            const allSelected = updatedPermissions.every((perm) => perm.access);

            if (module.permissions.find((perm) => perm.id === permissionId).access !== checked) {
              setChangedPermissionIds((prev) => new Set([...prev, permissionId]));
            }

            return {
              ...module,
              access: allSelected,
              permissions: updatedPermissions,
            };
          }
          return module;
        });
        return updatedData;
      });
    } else {
      setSelectedSubmenu((prev) => {
        const updatedPermissions = prev.permissions.map((perm) =>
          perm.id === permissionId ? { ...perm, access: checked } : perm
        );
        const allSelected = updatedPermissions.every((perm) => perm.access);

        const permission = prev.permissions.find((perm) => perm.id === permissionId);
        if (permission.access !== checked) {
          setChangedPermissionIds((prev) => new Set([...prev, permissionId]));
        }

        const updatedSubmenu = {
          ...prev,
          access: allSelected,
          permissions: updatedPermissions,
        };

        setWorkingData((prevData) =>
          prevData.map((module) => ({
            ...module,
            sub_menu: module.sub_menu.map((submenu) =>
              submenu.id === prev.id ? updatedSubmenu : submenu
            ),
          }))
        );

        return updatedSubmenu;
      });
    }
  };

  const handleDrawerSave = () => {
    setWorkingData((prevData) =>
      prevData.map((module) => ({
        ...module,
        sub_menu: module.sub_menu.map((submenu) =>
          submenu.id === selectedSubmenu.id ? selectedSubmenu : submenu
        ),
      }))
    );
    setOpenDrawer(false);
    setSelectedSubmenu(null);
  };

  const handleSaveAll = async () => {
    if (changedPermissionIds.size > 0) {
      const payload = {
        role_id: ID,
        permissions: Array.from(changedPermissionIds).map((permission_id) => ({
          permission_id,
          access: getPermissionAccess(permission_id),
        })),
      };
      const response = await APICALL(
        API_TYPE.POST,
        `${API_END_POINT.ASSIGN_PERMISSION}`,
        setLoading,
        payload,
        () => {},
        () => {},
        TOAST_MESSAGES.PERMISSION_UPDATED
      );
      if (response !== undefined) {
        getData();
        setChangedPermissionIds(new Set());
      }
    }
  };

  const getPermissionAccess = (permissionId) => {
    for (const module of workingData) {
      if (module.sub_menu?.length > 0) {
        for (const submenu of module.sub_menu) {
          const permission = submenu.permissions.find(
            (perm) => perm.id === permissionId
          );
          if (permission) return permission.access;
        }
      } else if (module.permissions?.length > 0) {
        const permission = module.permissions.find(
          (perm) => perm.id === permissionId
        );
        if (permission) return permission.access;
      }
    }
    return false;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {workingData?.map((module) => (
          <React.Fragment key={module.id}>
            <div className="col-span-1 md:col-span-5 lg:col-span-1 flex items-center">
              <h2 className="text-lg font-semibold">{module.name}</h2>
              <Checkbox
                checked={module.access}
                onCheckedChange={(checked) =>
                  handleModuleCheckboxChange(module.id, checked)
                }
                className="ml-2"
              />
            </div>
            <div className="col-span-1 md:col-span-5 lg:col-span-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {module.sub_menu?.length > 0 ? (
                  module.sub_menu.slice(0, 5).map((submenu) => (
                    <Button
                      key={submenu.id}
                      onClick={() => handleSubmenuClick(submenu)}
                      variant={submenu.access ? "default" : "secondary"}
                    >
                      {submenu.name}
                    </Button>
                  ))
                ) : module.permissions?.length > 0 ? (
                  module.permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={permission.access}
                        onCheckedChange={(checked) =>
                          handlePermissionChange(permission.id, checked, true)
                        }
                      />
                      <label className="text-sm font-medium">
                        {permission.action}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No permissions available</p>
                )}
                {module.sub_menu?.length > 5 && (
                  <div className="col-span-full mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {module.sub_menu.slice(5).map((submenu) => (
                        <Button
                          key={submenu.id}
                          onClick={() => handleSubmenuClick(submenu)}
                          variant={submenu.access ? "default" : "secondary"}
                        >
                          {submenu.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="col-span-2 flex justify-end mt-4">
        <Button type="button" onClick={handleSaveAll} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>

      {selectedSubmenu && (
        <CommonDrawer
          title={`Permissions for ${selectedSubmenu.name}`}
          description="Manage permissions for this submenu."
          isOpen={openDrawer}
          onOpenChange={handleDrawerClose}
          onSave={handleDrawerSave}
          loading={loading}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedSubmenu.access}
                onCheckedChange={(checked) =>
                  handleSubMenu(selectedSubmenu.id, checked)
                }
              />
              <label className="text-sm font-medium">
                {selectedSubmenu.name} (All)
              </label>
            </div>
            {selectedSubmenu.permissions.length > 0 ? (
              selectedSubmenu.permissions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={permission.access}
                    onCheckedChange={(checked) =>
                      handlePermissionChange(permission.id, checked)
                    }
                  />
                  <label className="text-sm">{permission.action}</label>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No permissions available</p>
            )}
          </div>
        </CommonDrawer>
      )}
    </>
  );
};

export default SpecificRole;