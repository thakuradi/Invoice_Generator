import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@nexawings.com",
      name: "Aditya Kumar",
    };

    emailClient.send({
      from: sender,
      to: [{ email: "aditya25022002@gmail.com"}],
      template_uuid: "8ca00416-37bf-4e37-ba50-6ec40b841593",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "InvoiceNexaWings",
        company_info_address: "Godrej Genesis",
        company_info_city: "Kolkata",
        company_info_zip_code: "700091",
        company_info_country: "West Bengal",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}
