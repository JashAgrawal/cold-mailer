import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const TemplateCardSkeleton = () => {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="skeleton h-4 w-24" />
        <p className="skeleton h-4 w-24" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="skeleton h-4 w-24" />
          <Skeleton className="skeleton h-4 w-24" />
          <Skeleton className="skeleton h-4 w-24" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Skeleton className="skeleton h-4 w-24" />
          <Skeleton className="skeleton h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

export default TemplateCardSkeleton
