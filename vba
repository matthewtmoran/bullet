Function GetSpools(inL)
' inL is length needed
Dim aryRet(1, 5)
'aryRet will return ?
'spot 0: numLarge,numMedium,numSmall,TotalFoot,TotalCost,Costperfoot,overage
'spot 1: numLarge,numMedium,numSmall,TotalFoot,TotalCost,Costperfoot,overage
Dim totCost As Double
Dim costFoot As Double

Dim arySp(2, 1)
'arySp = ((100,60),(250,137.5),(500,250)) 'array of spool length and pricing
arySp(0, 0) = 100
arySp(0, 1) = 60
arySp(1, 0) = 250
arySp(1, 1) = 137.5
arySp(2, 0) = 500
arySp(2, 1) = 250

'determine spools with minimum length overage
Dim wL
Dim SpLg, SpMd, SpSm
SpLg = 0
SpMd = 0
SpSm = 0
wL = inL

' DETERMINE MINIMUM NECESSARY SPOOLS
'start with largest spool
If wL >= arySp(2, 0) Then
    SpLg = Abs(wL \ arySp(2, 0))
    wL = wL - (SpLg * arySp(2, 0))
End If

'number of medium spools
If wL >= arySp(1, 0) Then
    SpMd = Abs(wL \ arySp(1, 0))
    wL = wL - (SpMd * arySp(1, 0))
End If

If wL >= arySp(0, 0) Then
    SpSm = Abs(wL \ arySp(0, 0))
    wL = wL - (SpSm * arySp(0, 0))
End If

'remaining wL will be covered by a smaller spool.
If wL > 0 Then
    SpSm = SpSm + 1
    wL = wL - (SpSm * arySp(0, 0))
End If

' with minimum spools, refactor to cover with fewer small spools by adding 1 to the next highest spool
totFoot = (arySp(2, 0) * SpLg) + (arySp(1, 0) * SpMd) + (arySp(0, 0) * SpSm)
totCost = ((arySp(2, 1) * SpLg) + (arySp(1, 1) * SpMd) + (arySp(0, 1) * SpSm))
costFoot = totCost / totFoot
totOver = totFoot - inL
aryRet(0, 0) = SpLg
aryRet(0, 1) = SpMd
aryRet(0, 2) = SpSm
aryRet(0, 3) = totFoot
aryRet(0, 4) = totCost
aryRet(0, 5) = costFoot
aryRet(0, 6) = totOver

'Refactor for 2nd array element using next larger up spool to cover minimum necessary
'Refactor ONLY if there are small or medium spools. Amounts that equal large spools without any overage do not require refactoring
If SpSm > 0 Or SpMd > 0 Then
    blnIsRefactored = False
    If SpSm > 0 Then
        SpSm = 0
        If SpMd = 0 Then 'any time that medium spools would move to 2 spools, instead make medium 1 and large + 1
            SpMd = SpMd + 1
        Else
            SpMd = 0
            SpLg = SpLg + 1
        End If
        blnIsRefactored = True
    End If

    If SpMd > 0 And Not blnIsRefactored Then
        SpMd = 0
        SpLg = SpLg + 1
        blnIsRefactored = True
    End If

End If

totFoot = (arySp(2, 0) * SpLg) + (arySp(1, 0) * SpMd) + (arySp(0, 0) * SpSm)
totCost = ((arySp(2, 1) * SpLg) + (arySp(1, 1) * SpMd) + (arySp(0, 1) * SpSm))
costFoot = totCost / totFoot
totOver = totFoot - inL
aryRet(1, 0) = SpLg
aryRet(1, 1) = SpMd
aryRet(1, 2) = SpSm
aryRet(0, 3) = totFoot
aryRet(0, 4) = totCost
aryRet(0, 5) = costFoot
aryRet(0, 6) = totOver

GetSpools = aryRet

End Function