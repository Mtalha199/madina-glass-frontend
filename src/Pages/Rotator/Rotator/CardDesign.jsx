import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a button component
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EllipsisVertical, Link, Link2, Pencil } from "lucide-react";

const CardDesign = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex">
            <div>
            Gold Testing{" "}
            <span className="ml-2">
              <Badge>23 DIDs</Badge>
            </span>
            </div>
            <div className="ml-auto">
            <EllipsisVertical />
            </div>
            </div>
          </CardTitle>
          <CardDescription>Name: 2024-10-09, 23:14:57</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="font-semibold">Allowed IPs</h3>
            <div className="flex flex-wrap space-x-2">
              {["154.192.137.18", "154.192.137.18", "154.192.137.18"].map(
                (ip, index) => (
                  <Badge key={index} variant={"secondary"}>
                    {" "}
                    {ip}
                  </Badge>
                )
              )}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Group(s)</h3>
            <div className="flex flex-wrap space-x-2">
              {["Group 1", "Group 2", "Group 3", "Test Group"].map(
                (group, index) => (
                  <Badge key={index} variant={"secondary"}>
                    {group}
                  </Badge>
                )
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">Associated Number Format:</h3>
              <Badge variant={"secondary"}> +1 81399958659</Badge>
            </div>
            <div className="space-x-2">
              <Button variant="outline"><Pencil />Edit</Button>
              <Button variant="outline"><Link2 />Copy URL</Button>
              <Button variant="outline"><Link />Copy Curl</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CardDesign;
