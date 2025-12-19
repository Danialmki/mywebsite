"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function IMessagePage() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <Card className="max-w-xl w-full shadow-xl border-2">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            A Little Note 💬
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-base leading-relaxed">
            I didn’t know how to make a link that opens iMessage directly,
            but I can give you directions:
          </p>
          <div className="text-left space-y-2">
            <p>• Open Messages</p>
            <p>• Find my contact (whatever you saved me as)</p>
            <p>• Write a playful, cute message</p>
            <p>• Tap the blue send button</p>
          </div>
          <p className="text-sm text-muted-foreground">
            If you want, I can try adding a button that opens Messages on some
            devices using an experimental `sms:` link.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
