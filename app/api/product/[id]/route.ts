import prisma from "@/libs/prismadb"
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, {params} : {params: {id: string}}) {

    const currentUser = await getCurrentUser();

    if(!currentUser) return NextResponse.error()

    if (currentUser.role !== 'ADMIN') {
        return NextResponse.error()
    }
  
    const product = await prisma.product.delete({
        where: {id: params.id},
       
    })

    return NextResponse.json(product);
} 

export async function PUT(request: Request, {params} : {params: {id: string}}) {

    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.error()
    }
  
    const body = await request.json()
    const {   name } = body;
   

    const product = await prisma.product.update({
        where: { id: params.id },
        data: {
            name
        }
       
    })

    return NextResponse.json(product);
} 