package lone

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/darxan/lone/x/lone/keeper"
	"github.com/darxan/lone/x/lone/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the whois
	for _, elem := range genState.WhoisList {
		k.SetWhois(ctx, elem)
	}
	// Set all the ctx
	
	// Set all the customtx
	for _, elem := range genState.CustomtxList {
		k.SetCustomtx(ctx, elem)
	}
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.WhoisList = k.GetAllWhois(ctx)
	genesis.CustomtxList = k.GetAllCustomtx(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
